import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Event } from '@entities/event.entity';
import { GenericCrudService } from '@shared/services/generic-crud.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto } from '@shared/dto/event/create-event.dto';
import { EventName } from '../../types/event.type';

@Processor('event')
export class EventProcessorService extends WorkerHost {
  private readonly logger = new Logger(EventProcessorService.name);

  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventService: GenericCrudService<Event>,
  ) {
    super();
  }

  async process(job: any): Promise<any> {
    const eventData = job.data as CreateEventDto;
    this.logger.log(`Processing event: ${eventData.eventName}`);

    try {
      const event = {
        messageId: `evt_${uuidv4()}`,
        timestamp: new Date().toISOString(),
        eventName: eventData.eventName,
        user: eventData.user,
        context: eventData.context,
        traffic: eventData.traffic,
        page: eventData.page,
        metrics: eventData.metrics,
        pulseAnalytics: eventData.pulseAnalytics
      };

      const createdEvent = await this.eventService.create(event);
      await this.processEventByType(createdEvent);

      return { success: true, eventId: createdEvent.id };
    } catch (error) {
      this.logger.error(`Error processing event: ${error.message}`, error.stack);
      throw error;
    }
  }

  private async processEventByType(event: Event): Promise<void> {
    const startTime = Date.now();
    try {
      switch (event.eventName) {
        case EventName.PAGE_VIEW:
          await this.processPageViewEvent(event);
          break;
        case EventName.USER_ACTION:
          await this.processUserActionEvent(event);
          break;
        case EventName.SYSTEM_EVENT:
          await this.processSystemEvent(event);
          break;
      }

      // Update metrics based on processing
      if (event.metrics) {
        event.metrics.loadTimeMs = Date.now() - startTime;
        event.metrics.errors = 0;
      }

      await this.eventService.update(event.id, event);
    } catch (error) {
      if (event.metrics) {
        event.metrics.errors = (event.metrics.errors || 0) + 1;
      }
      await this.eventService.update(event.id, event);
      throw error;
    }
  }

  private async processPageViewEvent(event: Event): Promise<void> {
    if (event.metrics) {
      event.metrics.pagesViewed = (event.metrics.pagesViewed || 0) + 1;
      event.metrics.bounced = event.metrics.pagesViewed <= 1;
    }
  }

  private async processUserActionEvent(event: Event): Promise<void> {
    if (event.metrics) {
      event.metrics.interactions = (event.metrics.interactions || 0) + 1;
      event.metrics.bounced = false;
    }
  }

  private async processSystemEvent(event: Event): Promise<void> {
    if (event.metrics) {
      event.metrics.interactions = (event.metrics.interactions || 0) + 1;
    }
  }
}
