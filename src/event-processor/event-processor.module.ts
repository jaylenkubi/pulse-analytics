import { Module } from '@nestjs/common';
import { EventProcessorService } from './event-processor.service';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'event',
    }),
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [EventProcessorService],
})
export class EventProcessorModule {}
