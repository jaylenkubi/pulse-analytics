import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

@Processor('event')
export class EventProcessorService extends WorkerHost {
  private readonly logger = new Logger(EventProcessorService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {
    super();
  }

  async process(job: any): Promise<any> {
    // const eventData = job.data as CreateEventDto;
    console.log(`Processing event: ${job}`);
    this.logger.log(`Processing event: ${job}`);

    // try {
    //   const event = this.eventRepository.create({
    //     eventType: eventData.eventType,
    //     payload: eventData.payload,
    //     timestamp: eventData.timestamp ? new Date(eventData.timestamp) : new Date(),
    //     processingStatus: 'pending',
    //     metadata: {}
    //   });

    //   await this.processEventByType(event);

    //   event.processingStatus = 'processed';
    //   await this.eventRepository.save(event);

    //   return { success: true, eventId: event.id };
    // } catch (error) {
    //   this.logger.error(`Error processing event: ${error.message}`, error.stack);
    //   throw error;
    // }
  }

  private async processEventByType(event: Event): Promise<void> {
    const startTime = Date.now();
    try {
      switch (event.eventType) {
        case 'pageView':
          await this.processPageViewEvent(event);
          break;
        case 'userAction':
          await this.processUserActionEvent(event);
          break;
        default:
          await this.processGenericEvent(event);
      }

      event.metadata = {
        ...event.metadata,
        processingTime: Date.now() - startTime,
        processedAt: new Date().toISOString(),
      };
    } catch (error) {
      event.processingStatus = 'failed';
      event.metadata = {
        ...event.metadata,
        error: error.message,
        failedAt: new Date().toISOString(),
      };
      throw error;
    }
  }

  private async processPageViewEvent(event: Event): Promise<void> {
    event.metadata = {
      ...event.metadata,
      pageViewData: {
        processedAt: new Date().toISOString(),
      },
    };
  }

  private async processUserActionEvent(event: Event): Promise<void> {
    event.metadata = {
      ...event.metadata,
      userActionData: {
        processedAt: new Date().toISOString(),
      },
    };
  }

  private async processGenericEvent(event: Event): Promise<void> {
    event.metadata = {
      ...event.metadata,
      genericData: {
        processedAt: new Date().toISOString(),
      },
    };
  }
}
