import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from '@entities/website.entity';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';

const WebsiteController = createGenericController<Website>('websites');

const websiteService = {
  provide: 'WEBSITES_SERVICE',
  useFactory: (repository: Repository<Website>) => createGenericService(repository),
  inject: [getRepositoryToken(Website)],
};

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  controllers: [WebsiteController],
  providers: [websiteService],
  exports: [websiteService, TypeOrmModule]
})
export class WebsiteModule {}
