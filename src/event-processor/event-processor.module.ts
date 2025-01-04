import { Module } from '@nestjs/common';
import { EventProcessorService } from './event-processor.service';
import { EventProcessorController } from './event-processor.controller';

@Module({
  providers: [EventProcessorService],
  controllers: [EventProcessorController]
})
export class EventProcessorModule {}
