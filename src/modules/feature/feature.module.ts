import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '../../database/entities/feature.entity';
import { WebsiteFeature } from '../../database/entities/website-feature.entity';
import { AccessLevelFeature } from '../../database/entities/access-level-feature.entity';
import { WebsiteAccess } from '../../database/entities/website-access.entity';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feature,
      WebsiteFeature,
      AccessLevelFeature,
      WebsiteAccess
    ]),
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
