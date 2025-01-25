import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@entities/event.entity';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';

const EventController = createGenericController<Event>('events');

const eventService = {
  provide: 'EVENT_SERVICE',
  useFactory: (repository: Repository<Event>) => createGenericService(repository),
  inject: [getRepositoryToken(Event)],
};

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [eventService],
  exports: [eventService, TypeOrmModule]
})
export class EventModule {}
