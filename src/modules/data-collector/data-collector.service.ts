import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateEventDto } from '@shared/dto/event/create-event.dto';

@Injectable()
export class DataCollectorService {
  private readonly logger = new Logger(DataCollectorService.name);

  constructor(@InjectQueue('event') private eventQueue: Queue) {}

  async collectEvent(eventData: CreateEventDto) {
    try {
      // Ensure we have a properly structured event
      const event = {
        eventName: eventData.eventName,
        user: eventData.user,
        context: eventData.context,
        traffic: eventData.traffic,
        page: eventData.page,
        metrics: {
          ...eventData.metrics,
          engagementTimeMs: 0, // Will be updated during processing
          pagesViewed: 0, // Will be updated during processing
          bounced: true, // Will be updated during processing
          interactions: 0, // Will be updated during processing
          errors: 0 // Will be updated during processing
        },
        pulseAnalytics: eventData.pulseAnalytics
      };

      await this.eventQueue.add('process-event', event, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      });

      this.logger.log(`Event queued for processing: ${event.eventName}`);
      return { success: true, message: 'Event queued for processing' };
    } catch (error) {
      this.logger.error(`Error queuing event: ${error.message}`, error.stack);
      throw error;
    }
  }
}
