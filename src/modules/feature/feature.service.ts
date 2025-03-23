import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Feature } from '../../database/entities/feature.entity';
import { WebsiteFeature } from '../../database/entities/website-feature.entity';
import { AccessLevelFeature } from '../../database/entities/access-level-feature.entity';
import { WebsiteAccess } from '../../database/entities/website-access.entity';
import { CreateFeatureDto } from '../../shared/dto/feature/create-feature.dto';
import { UpdateFeatureDto } from '../../shared/dto/feature/update-feature.dto';
import { WebsiteFeatureDto } from '../../shared/dto/feature/website-feature.dto';
import { AccessLevelFeatureDto } from '../../shared/dto/feature/access-level-feature.dto';
import { TypeOrmAdapter } from '@shared/adapters/typeorm.adapter';

@Injectable()
export class FeatureService {
    constructor(
        @InjectRepository(Feature)
        private featureRepository: TypeOrmAdapter<Feature>,
        @InjectRepository(WebsiteFeature)
        private websiteFeatureRepository: TypeOrmAdapter<WebsiteFeature>,
        @InjectRepository(AccessLevelFeature)
        private accessLevelFeatureRepository: TypeOrmAdapter<AccessLevelFeature>,
        @InjectRepository(WebsiteAccess)
        private websiteAccessRepository: TypeOrmAdapter<WebsiteAccess>,
    ) {}

    // Feature Management
    async createFeature(createFeatureDto: CreateFeatureDto): Promise<Feature> {
        return this.featureRepository.create(createFeatureDto);
    }

    async getAllFeatures(): Promise<Feature[]> {
        return this.featureRepository.findAll();
    }

    async getAllFeaturesByWebsiteId(websiteId: string): Promise<Feature[]> {
        const websiteFeatures = await this.websiteFeatureRepository.findByQuery({
            where: { website: { id: websiteId } },
            relations: ['feature']
        });
        
        return websiteFeatures.map(wf => wf.feature);
    }

    async getByQueryFeature(query: FindManyOptions<Feature>): Promise<Feature[]> {
        return this.featureRepository.findByQuery(query);
    }

    async getFeatureByName(name: string): Promise<Feature> {
        const features = await this.featureRepository.findByQuery({ where: { name }, take: 1 });
        if (!features || features.length === 0) {
            throw new NotFoundException(`Feature with name ${name} not found`);
        }
        return features[0];
    }

    async updateFeature(id: string, updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
        const feature = await this.getFeatureByName(id);
        return this.featureRepository.update(id, updateFeatureDto);
    }

    async deleteFeature(id: string | number): Promise<void> {
        await this.featureRepository.delete(id);
    }

    // Website Feature Management
    async enableFeatureForWebsite(websiteFeatureDto: WebsiteFeatureDto): Promise<WebsiteFeature | number | null> {
        const { websiteId, featureId, isEnabled, configuration } = websiteFeatureDto;
        
        const features = await this.websiteFeatureRepository.findByQuery({
            where: {
                website: { id: websiteId },
                feature: { id: featureId }
            },
            relations: ['website', 'feature']
        });

        if (!features || features.length === 0) {
            return this.websiteFeatureRepository.create({
                website: { id: websiteId },
                feature: { id: featureId },
                isEnabled,
                configuration
            });
        } else {
            return this.websiteFeatureRepository.update(features[0].id, {
                isEnabled,
                configuration
            });
        }
    }

    async getWebsiteFeatures(websiteId: string): Promise<WebsiteFeature[]> {
        return this.websiteFeatureRepository.findByQuery({
            where: { website: { id: websiteId } },
            relations: ['feature']
        });
    }

    // Access Level Feature Management
    async setFeatureAccessLevel(accessLevelFeatureDto: AccessLevelFeatureDto): Promise<AccessLevelFeature | null> {
        const { featureName, accessLevel, permissions } = accessLevelFeatureDto;
        
        const features = await this.accessLevelFeatureRepository.findByQuery({
            where: {
                feature: { name: featureName },
                accessLevel
            },
            relations: ['feature']
        });

        if (!features || features.length === 0) {
            return this.accessLevelFeatureRepository.create({
                feature: { name: featureName },
                accessLevel,
                permissions
            });
        } else {
            return this.accessLevelFeatureRepository.update(features[0].id, {
                permissions
            });
        }
    }

    async getFeatureAccessLevels(featureName: string): Promise<AccessLevelFeature[]> {
        return this.accessLevelFeatureRepository.findByQuery({
            where: { feature: { name: featureName } }
        });
    }

    // Feature Access Check
    async canUserAccessFeature(
        userId: string,
        websiteId: string,
        featureName: string
    ): Promise<boolean> {
        // 1. Check if user has access to the website
        const websiteAccesses = await this.websiteAccessRepository.findByQuery({
            where: {
                user: { id: userId },
                website: { id: websiteId }
            }
        });

        if (!websiteAccesses || websiteAccesses.length === 0) {
            return false;
        }
        const websiteAccess = websiteAccesses[0];

        // 2. Check if feature is enabled for the website
        const websiteFeatures = await this.websiteFeatureRepository.findByQuery({
            where: {
                website: { id: websiteId },
                feature: { name: featureName }
            },
            relations: ['feature']
        });

        if (!websiteFeatures || websiteFeatures.length === 0 || !websiteFeatures[0].isEnabled) {
            return false;
        }

        // 3. Check if user's access level has permission for this feature
        const accessLevelFeatures = await this.accessLevelFeatureRepository.findByQuery({
            where: {
                accessLevel: websiteAccess.access_level,
                feature: { name: featureName }
            }
        });

        if (!accessLevelFeatures || accessLevelFeatures.length === 0) {
            return false;
        }
        
        return accessLevelFeatures[0]?.permissions?.canView ?? false;
    }

    async canUserEditFeature(
        userId: string,
        websiteId: string,
        featureName: string
    ): Promise<boolean> {
        const websiteAccesses = await this.websiteAccessRepository.findByQuery({
            where: {
                user: { id: userId },
                website: { id: websiteId }
            }
        });

        if (!websiteAccesses || websiteAccesses.length === 0) {
            return false;
        }
        const websiteAccess = websiteAccesses[0];

        const accessLevelFeatures = await this.accessLevelFeatureRepository.findByQuery({
            where: {
                accessLevel: websiteAccess.access_level,
                feature: { name: featureName }
            }
        });

        if (!accessLevelFeatures || accessLevelFeatures.length === 0) {
            return false;
        }
        
        return accessLevelFeatures[0]?.permissions?.canEdit ?? false;
    }

    async canUserManageFeature(
        userId: string,
        websiteId: string,
        featureName: string
    ): Promise<boolean> {
        const websiteAccesses = await this.websiteAccessRepository.findByQuery({
            where: {
                user: { id: userId },
                website: { id: websiteId }
            }
        });

        if (!websiteAccesses || websiteAccesses.length === 0) {
            return false;
        }
        const websiteAccess = websiteAccesses[0];

        const accessLevelFeatures = await this.accessLevelFeatureRepository.findByQuery({
            where: {
                accessLevel: websiteAccess.access_level,
                feature: { name: featureName }
            }
        });

        if (!accessLevelFeatures || accessLevelFeatures.length === 0) {
            return false;
        }
        
        return accessLevelFeatures[0]?.permissions?.canManage ?? false;
    }
}
