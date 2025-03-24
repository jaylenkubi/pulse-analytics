import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from '@entities/website.entity';
import { WebsiteAccess } from '@entities/website-access.entity';
import { WebsiteFeature } from '@entities/website-feature.entity';
import { Feature } from '@entities/feature.entity';
import { User } from '@entities/user.entity';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';
import { WebsiteExecutionController } from './website-execution.controller';
import { WebsiteExecutionService } from './website-execution.service';

const WebsiteController = createGenericController<Website>('websites');

const websiteService = {
  provide: 'WEBSITES_SERVICE',
  useFactory: (repository: Repository<Website>) => createGenericService(repository),
  inject: [getRepositoryToken(Website)],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Website,
      WebsiteAccess,
      WebsiteFeature,
      Feature,
      User
    ])
  ],
  controllers: [WebsiteController, WebsiteExecutionController],
  providers: [websiteService, WebsiteExecutionService],
  exports: [websiteService, TypeOrmModule]
})
export class WebsiteModule {}
