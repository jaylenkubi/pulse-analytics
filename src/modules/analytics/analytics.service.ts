import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { Event } from '@entities/event.entity';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getEventStats(timeRange: { start: Date; end: Date }) {
    const cacheKey = `event-stats-${timeRange.start}-${timeRange.end}`;
    const cached = await this.cacheManager.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const stats = await this.eventRepository
      .createQueryBuilder('event')
      .select('event.eventType', 'type')
      .addSelect('COUNT(*)', 'count')
      .where('event.timestamp BETWEEN :start AND :end', timeRange)
      .groupBy('event.eventType')
      .getRawMany();

    await this.cacheManager.set(cacheKey, stats, 300); // Cache for 5 minutes
    return stats;
  }

  async getRealtimeEvents() {
    const lastMinute = new Date(Date.now() - 60000);
    return this.eventRepository.find({
        where: {
          // @ts-ignore
        timestamp: { $gte: lastMinute },
        processingStatus: 'processed'
      },
      order: { timestamp: 'DESC' },
      take: 100
    });
  }

  async getEventTimeline(
    eventType: string,
    interval: '1m' | '5m' | '1h' = '5m',
    timeRange: { start: Date; end: Date; page?: number; limit?: number }
  ) {
    const cacheKey = `timeline-${eventType}-${interval}-${timeRange.start}-${timeRange.end}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const timeline = await this.eventRepository
      .createQueryBuilder('event')
      .select(`time_bucket('${interval}', event.timestamp)`, 'bucket')
      .addSelect('COUNT(*)', 'count')
      .where('event.eventType = :eventType', { eventType })
      .andWhere('event.timestamp BETWEEN :start AND :end', timeRange)
      .groupBy('bucket')
      .orderBy('bucket', 'ASC')
      .getRawMany();

    await this.cacheManager.set(cacheKey, timeline, 300);
    return timeline;
  }
}