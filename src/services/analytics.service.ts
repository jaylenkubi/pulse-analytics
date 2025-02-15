import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '../database/entities/event.entity';
import { AnalyticsEvent, EventName } from '../types/analytics';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async trackEvent(eventData: Omit<AnalyticsEvent, 'message_id' | 'timestamp'>) {
    const event = this.eventRepository.create({
      message_id: `evt_${uuidv4()}`,
      timestamp: new Date().toISOString(),
      ...eventData,
    });

    return this.eventRepository.save(event);
  }

  async getTrafficSourceStats(startDate: Date, endDate: Date) {
    return this.eventRepository
      .createQueryBuilder('event')
      .where('event.event_name = :eventName', { eventName: 'page_view' })
      .andWhere('event.timestamp BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'event.traffic->\'source\' as source',
        'event.traffic->\'medium\' as medium',
        'COUNT(*) as visits',
        'COUNT(DISTINCT event.user->>\'id\') as unique_visitors',
        'AVG(CAST(event.metrics->>\'engagement_time_ms\' AS INTEGER)) as avg_engagement_time',
        'AVG(CAST(event.metrics->>\'bounce_rate\' AS FLOAT)) as bounce_rate',
      ])
      .groupBy('event.traffic->\'source\', event.traffic->\'medium\'')
      .getRawMany();
  }

  async getPagePerformance(startDate: Date, endDate: Date) {
    return this.eventRepository
      .createQueryBuilder('event')
      .where('event.event_name = :eventName', { eventName: 'page_view' })
      .andWhere('event.timestamp BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'event.page->\'path\' as path',
        'COUNT(*) as pageviews',
        'AVG(CAST(event.metrics->>\'load_time_ms\' AS INTEGER)) as avg_load_time',
        'AVG(CAST(event.metrics->>\'scroll_depth\' AS INTEGER)) as avg_scroll_depth',
      ])
      .groupBy('event.page->\'path\'')
      .getRawMany();
  }

  async getUserBehavior(startDate: Date, endDate: Date) {
    return this.eventRepository
      .createQueryBuilder('event')
      .where('event.timestamp BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'event.user->\'id\' as user_id',
        'COUNT(*) as total_events',
        'SUM(CASE WHEN event.event_name = \'page_view\' THEN 1 ELSE 0 END) as pageviews',
        'AVG(CAST(event.metrics->>\'engagement_time_ms\' AS INTEGER)) as avg_engagement_time',
      ])
      .groupBy('event.user->\'id\'')
      .getRawMany();
  }
}
