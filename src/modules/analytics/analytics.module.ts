import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@entities/event.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { GenericCrudService } from '@shared/services/generic-crud.service';
import { Repository } from 'typeorm';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [
    AnalyticsService,
    {
      provide: 'EVENT_SERVICE',
      useFactory: (repository: Repository<Event>) => createGenericService(repository),
    }
  ],
  controllers: [AnalyticsController]
})
export class AnalyticsModule { }
