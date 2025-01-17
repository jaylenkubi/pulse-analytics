import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class DataCollectorService {
  constructor(@InjectQueue('event') private eventQueue: Queue) {}

  async collectEvent(event: any) {
    const eventData = typeof event === 'string' ? JSON.parse(event) : event;
    const actualEventData = eventData.data || eventData;
    await this.eventQueue.add('process-event', actualEventData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
    return { success: true, message: 'Event queued for processing' };
  }
}
