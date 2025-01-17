import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EventProcessorService } from './event-processor.service';
import { UserModule } from '../user/user.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'event',
    }),
    UserModule,
    EventModule
  ],
  providers: [EventProcessorService],
})
export class EventProcessorModule {}
