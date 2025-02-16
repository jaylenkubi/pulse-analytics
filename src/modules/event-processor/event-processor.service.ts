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
    this.logger.log(`Processing event: ${eventData.event_name}`);

    try {
      const event = {
        message_id: `evt_${uuidv4()}`,
        timestamp: new Date().toISOString(),
        event_name: eventData.event_name,
        user: eventData.user,
        context: eventData.context,
        traffic: eventData.traffic,
        page: eventData.page,
        metrics: eventData.metrics,
        pulse_analytics: eventData.pulse_analytics
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
      switch (event.event_name) {
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
        event.metrics.load_time_ms = Date.now() - startTime;
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
      event.metrics.pages_viewed = (event.metrics.pages_viewed || 0) + 1;
      event.metrics.bounced = event.metrics.pages_viewed <= 1;
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
