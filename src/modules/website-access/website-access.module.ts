import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteAccess } from '@entities/website-access.entity';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';

const WebsiteAccessController = createGenericController<WebsiteAccess>('website-access');

const websiteAccessService = {
  provide: 'WEBSITE-ACCESS_SERVICE',
  useFactory: (repository: Repository<WebsiteAccess>) => createGenericService(repository),
  inject: [getRepositoryToken(WebsiteAccess)],
};

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteAccess])],
  controllers: [WebsiteAccessController],
  providers: [websiteAccessService],
  exports: [websiteAccessService, TypeOrmModule]
})
export class WebsiteAccessModule {}
