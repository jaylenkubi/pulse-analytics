import { Module } from '@nestjs/common';
import { DataCollectorService } from './data-collector.service';
import { DataCollectorController } from './data-collector.controller';
import { BullModule } from '@nestjs/bullmq';
import { DataCollectorGateway } from './data-collector.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'event',
    })
  ],
  providers: [
    DataCollectorService, 
    DataCollectorGateway,
  ],
  controllers: [DataCollectorController]
})
export class DataCollectorModule {}
