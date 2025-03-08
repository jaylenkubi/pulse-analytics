import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@entities/event.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { GenericCrudService } from '@shared/services/generic-crud.service';
import { Repository } from 'typeorm';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { FeatureModule } from '../feature/feature.module';
import { getRepositoryToken } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    FeatureModule,
  ],
  providers: [
    AnalyticsService,
    {
      provide: 'EVENT_SERVICE',
      useFactory: (repository: Repository<Event>) => createGenericService(repository),
      inject: [getRepositoryToken(Event)]
    }
  ],
  controllers: [AnalyticsController]
})
export class AnalyticsModule { }
