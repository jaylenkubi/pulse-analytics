import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class DataCollectorService {
  constructor(
    @InjectQueue('events') private readonly eventQueue: Queue,
  ) {}

  async collectEvent(event: any) {
    // Add validation here later
    await this.eventQueue.add('process-event', event, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
    return { success: true, message: 'Event queued for processing' };
  }
}