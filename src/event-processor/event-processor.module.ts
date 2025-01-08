import { Module } from '@nestjs/common';
import { EventProcessorService } from './event-processor.service';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'events',
    }),
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [EventProcessorService],
})
export class EventProcessorModule {}
