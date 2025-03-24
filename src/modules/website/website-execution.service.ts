import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Website } from '@entities/website.entity';
import { WebsiteAccess, WebsiteAccessLevel } from '@entities/website-access.entity';
import { WebsiteFeature } from '@entities/website-feature.entity';
import { Feature } from '@entities/feature.entity';
import { User } from '@entities/user.entity';
import { SetupWebsiteDto } from '@shared/dto/website/setup-website.dto';

@Injectable()
export class WebsiteExecutionService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    @InjectRepository(WebsiteAccess)
    private readonly websiteAccessRepository: Repository<WebsiteAccess>,
    @InjectRepository(WebsiteFeature)
    private readonly websiteFeatureRepository: Repository<WebsiteFeature>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async setupWebsite(setupWebsiteDto: SetupWebsiteDto): Promise<Website> {
    const user = await this.userRepository.findOne({ where: { id: setupWebsiteDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${setupWebsiteDto.userId} not found`);
    }

    const trackingId = setupWebsiteDto.trackingId || uuidv4();

    const website = this.websiteRepository.create({
      name: setupWebsiteDto.name,
      domains: setupWebsiteDto.domains,
      trackingId,
      settings: {
        trackingOptions: ["pageviews", "events"],
        excludedPaths: [],
        customVariables: {}
      },
      owner: user
    });

    const savedWebsite = await this.websiteRepository.save(website);

    const websiteAccess = this.websiteAccessRepository.create({
      website: savedWebsite,
      user,
      accessLevel: WebsiteAccessLevel.OWNER
    });
    await this.websiteAccessRepository.save(websiteAccess);

    if (setupWebsiteDto.features && setupWebsiteDto.features.length > 0) {
      const features = await this.featureRepository.find({
        where: setupWebsiteDto.features.map(name => ({ name }))
      });

      if (features.length !== setupWebsiteDto.features.length) {
        const foundFeatureNames = features.map(f => f.name);
        const missingFeatures = setupWebsiteDto.features.filter(name => !foundFeatureNames.includes(name));
        throw new BadRequestException(`The following features do not exist: ${missingFeatures.join(', ')}`);
      }

      const websiteFeatures = features.map(feature => 
        this.websiteFeatureRepository.create({
          website: savedWebsite,
          feature,
          isEnabled: true,
          configuration: {}
        })
      );
      await this.websiteFeatureRepository.save(websiteFeatures);
    }

    return this.websiteRepository.findOne({
      where: { id: savedWebsite.id },
      relations: ['owner', 'websiteFeatures', 'websiteFeatures.feature']
    });
  }
}
