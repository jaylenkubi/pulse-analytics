import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '../../database/entities/feature.entity';
import { WebsiteFeature } from '../../database/entities/website-feature.entity';
import { AccessLevelFeature } from '../../database/entities/access-level-feature.entity';
import { WebsiteAccess } from '../../database/entities/website-access.entity';
import { CreateFeatureDto } from '../../shared/dto/feature/create-feature.dto';
import { UpdateFeatureDto } from '../../shared/dto/feature/update-feature.dto';
import { WebsiteFeatureDto } from '../../shared/dto/feature/website-feature.dto';
import { AccessLevelFeatureDto } from '../../shared/dto/feature/access-level-feature.dto';

@Injectable()
export class FeatureService {
    constructor(
        @InjectRepository(Feature)
        private featureRepository: Repository<Feature>,
        @InjectRepository(WebsiteFeature)
        private websiteFeatureRepository: Repository<WebsiteFeature>,
        @InjectRepository(AccessLevelFeature)
        private accessLevelFeatureRepository: Repository<AccessLevelFeature>,
        @InjectRepository(WebsiteAccess)
        private websiteAccessRepository: Repository<WebsiteAccess>,
    ) {}

    // Feature Management
    async createFeature(createFeatureDto: CreateFeatureDto): Promise<Feature> {
        const feature = this.featureRepository.create(createFeatureDto);
        return this.featureRepository.save(feature);
    }

    async getAllFeatures(): Promise<Feature[]> {
        return this.featureRepository.find();
    }

    async getFeatureByName(name: string): Promise<Feature> {
        const feature = await this.featureRepository.findOne({ where: { name } });
        if (!feature) {
            throw new NotFoundException(`Feature with name ${name} not found`);
        }
        return feature;
    }

    async updateFeature(name: string, updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
        const feature = await this.getFeatureByName(name);
        Object.assign(feature, updateFeatureDto);
        return this.featureRepository.save(feature);
    }

    async deleteFeature(name: string): Promise<void> {
        const feature = await this.getFeatureByName(name);
        await this.featureRepository.remove(feature);
    }

    // Website Feature Management
    async enableFeatureForWebsite(websiteFeatureDto: WebsiteFeatureDto): Promise<WebsiteFeature> {
        const { websiteId, featureName, isEnabled, configuration } = websiteFeatureDto;
        
        let websiteFeature = await this.websiteFeatureRepository.findOne({
            where: {
                website: { id: websiteId },
                feature: { name: featureName }
            },
            relations: ['website', 'feature']
        });

        if (!websiteFeature) {
            websiteFeature = this.websiteFeatureRepository.create({
                website: { id: websiteId },
                feature: { name: featureName },
                isEnabled,
                configuration
            });
        } else {
            websiteFeature.isEnabled = isEnabled;
            websiteFeature.configuration = configuration || websiteFeature.configuration;
        }

        return this.websiteFeatureRepository.save(websiteFeature);
    }

    async getWebsiteFeatures(websiteId: string): Promise<WebsiteFeature[]> {
        return this.websiteFeatureRepository.find({
            where: { website: { id: websiteId } },
            relations: ['feature']
        });
    }

    // Access Level Feature Management
    async setFeatureAccessLevel(accessLevelFeatureDto: AccessLevelFeatureDto): Promise<AccessLevelFeature> {
        const { featureName, accessLevel, permissions } = accessLevelFeatureDto;
        
        let accessLevelFeature = await this.accessLevelFeatureRepository.findOne({
            where: {
                feature: { name: featureName },
                accessLevel
            },
            relations: ['feature']
        });

        if (!accessLevelFeature) {
            accessLevelFeature = this.accessLevelFeatureRepository.create({
                feature: { name: featureName },
                accessLevel,
                permissions
            });
        } else {
            accessLevelFeature.permissions = permissions;
        }

        return this.accessLevelFeatureRepository.save(accessLevelFeature);
    }

    async getFeatureAccessLevels(featureName: string): Promise<AccessLevelFeature[]> {
        return this.accessLevelFeatureRepository.find({
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
        const websiteAccess = await this.websiteAccessRepository.findOne({
            where: {
                user: { id: userId },
                website: { id: websiteId }
            }
        });

        if (!websiteAccess) {
            return false;
        }

        // 2. Check if feature is enabled for the website
        const websiteFeature = await this.websiteFeatureRepository.findOne({
            where: {
                website: { id: websiteId },
                feature: { name: featureName }
            },
            relations: ['feature']
        });

        if (!websiteFeature?.isEnabled) {
            return false;
        }

        // 3. Check if user's access level has permission for this feature
        const accessLevelFeature = await this.accessLevelFeatureRepository.findOne({
            where: {
                accessLevel: websiteAccess.access_level,
                feature: { name: featureName }
            }
        });

        return accessLevelFeature?.permissions?.canView ?? false;
    }

    async canUserEditFeature(
        userId: string,
        websiteId: string,
        featureName: string
    ): Promise<boolean> {
        const websiteAccess = await this.websiteAccessRepository.findOne({
            where: {
                user: { id: userId },
                website: { id: websiteId }
            }
        });

        if (!websiteAccess) {
            return false;
        }

        const accessLevelFeature = await this.accessLevelFeatureRepository.findOne({
            where: {
                accessLevel: websiteAccess.access_level,
                feature: { name: featureName }
            }
        });

        return accessLevelFeature?.permissions?.canEdit ?? false;
    }

    async canUserManageFeature(
        userId: string,
        websiteId: string,
        featureName: string
    ): Promise<boolean> {
        const websiteAccess = await this.websiteAccessRepository.findOne({
            where: {
                user: { id: userId },
                website: { id: websiteId }
            }
        });

        if (!websiteAccess) {
            return false;
        }

        const accessLevelFeature = await this.accessLevelFeatureRepository.findOne({
            where: {
                accessLevel: websiteAccess.access_level,
                feature: { name: featureName }
            }
        });

        return accessLevelFeature?.permissions?.canManage ?? false;
    }
}
