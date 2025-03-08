import { Injectable, Inject } from '@nestjs/common';
import { Event } from '../../database/entities/event.entity';
import { EventName } from '@/types/event.type';
import { GenericCrudService } from '@shared/services/generic-crud.service';
import { Between, FindManyOptions } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject('EVENT_SERVICE')
    private eventService: GenericCrudService<Event>,
  ) {}

  async getTrafficSourceStats(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        event_name: EventName.PAGE_VIEW,
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        website_id: websiteId
      },
      select: [
        'traffic',
        'user',
        'metrics'
      ]
    };

    const events = await this.eventService.getByQuery(query);
    
    // Process the events in memory since we can't use raw SQL with the generic service
    const statsMap = new Map<string, any>();
    
    events.forEach(event => {
      const key = `${event.traffic?.source || 'unknown'}-${event.traffic?.medium || 'unknown'}`;
      const stats = statsMap.get(key) || {
        source: event.traffic?.source,
        medium: event.traffic?.medium,
        visits: 0,
        unique_visitors: new Set(),
        total_engagement_time: 0,
        bounce_count: 0,
        count: 0
      };
      
      stats.visits++;
      stats.unique_visitors.add(event.user?.id);
      stats.total_engagement_time += Number(event.metrics?.engagement_time_ms || '0');
      if (event.metrics?.bounced) {
        stats.bounce_count++;
      }
      stats.count++;
      
      statsMap.set(key, stats);
    });
    
    return Array.from(statsMap.values()).map(stats => ({
      source: stats.source,
      medium: stats.medium,
      visits: stats.visits,
      unique_visitors: stats.unique_visitors.size,
      avg_engagement_time: stats.total_engagement_time / stats.count,
      bounce_rate: stats.bounce_count / stats.count
    }));
  }

  async getPagePerformance(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        event_name: EventName.PAGE_VIEW,
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        website_id: websiteId
      },
      select: [
        'page',
        'metrics'
      ]
    };

    const events = await this.eventService.getByQuery(query);
    
    const statsMap = new Map<string, any>();
    
    events.forEach(event => {
      const path = event.page?.path || 'unknown';
      const stats = statsMap.get(path) || {
        path,
        pageviews: 0,
        total_load_time: 0,
        total_scroll_depth: 0,
        count: 0
      };
      
      stats.pageviews++;
      stats.total_load_time += Number(event.metrics?.load_time_ms || '0');
      stats.total_scroll_depth += Number(event.metrics?.scroll_depth || '0');
      stats.count++;
      
      statsMap.set(path, stats);
    });
    
    return Array.from(statsMap.values()).map(stats => ({
      path: stats.path,
      pageviews: stats.pageviews,
      avg_load_time: stats.total_load_time / stats.count,
      avg_scroll_depth: stats.total_scroll_depth / stats.count
    }));
  }

  async getUserBehavior(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        website_id: websiteId
      },
      select: [
        'user',
        'event_name',
        'metrics'
      ]
    };

    const events = await this.eventService.getByQuery(query);
    
    const statsMap = new Map<string, any>();
    
    events.forEach(event => {
      const userId = event.user?.id || 'unknown';
      const stats = statsMap.get(userId) || {
        user_id: userId,
        total_events: 0,
        pageviews: 0,
        total_engagement_time: 0,
        count: 0
      };
      
      stats.total_events++;
      if (event.event_name === EventName.PAGE_VIEW) {
        stats.pageviews++;
      }
      stats.total_engagement_time += Number(event.metrics?.engagement_time_ms || '0');
      stats.count++;
      
      statsMap.set(userId, stats);
    });
    
    return Array.from(statsMap.values()).map(stats => ({
      user_id: stats.user_id,
      total_events: stats.total_events,
      pageviews: stats.pageviews,
      avg_engagement_time: stats.total_engagement_time / stats.count
    }));
  }

  async getRealtimeAnalytics(websiteId: string) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const query: FindManyOptions<Event> = {
      where: {
        timestamp: Between(fiveMinutesAgo.toISOString(), new Date().toISOString()),
        website_id: websiteId
      },
      order: {
        timestamp: 'DESC'
      },
      take: 100
    };

    const events = await this.eventService.getByQuery(query);
    
    const activePages = new Map<string, number>();
    const recentEvents = events.slice(0, 10).map(event => ({
      type: event.event_name,
      page: event.page?.path,
      timestamp: event.timestamp
    }));
    
    events.forEach(event => {
      if (event.event_name === EventName.PAGE_VIEW) {
        const path = event.page?.path || 'unknown';
        activePages.set(path, (activePages.get(path) || 0) + 1);
      }
    });

    return {
      active_visitors: new Set(events.map(e => e.user?.id)).size,
      active_pages: Array.from(activePages.entries()).map(([path, count]) => ({
        path,
        visitors: count
      })).sort((a, b) => b.visitors - a.visitors).slice(0, 5),
      recent_events: recentEvents,
      events_per_minute: events.length / 5
    };
  }

  async getAudienceAnalytics(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        website_id: websiteId
      },
      select: [
        'user',
        'context',
        'metrics'
      ]
    };

    const events = await this.eventService.getByQuery(query);
    
    const deviceStats = new Map<string, number>();
    const geoStats = new Map<string, number>();
    const userRetention = new Map<string, Set<string>>();
    
    events.forEach(event => {
      const deviceType = event.context?.device?.type || 'unknown';
      deviceStats.set(deviceType, (deviceStats.get(deviceType) || 0) + 1);
      
      const country = event.context?.geo?.country || 'unknown';
      geoStats.set(country, (geoStats.get(country) || 0) + 1);
      
      const date = event.timestamp.split('T')[0];
      const userId = event.user?.id;
      if (userId) {
        if (!userRetention.has(date)) {
          userRetention.set(date, new Set());
        }
        userRetention.get(date)?.add(userId);
      }
    });

    return {
      total_users: new Set(events.map(e => e.user?.id)).size,
      device_breakdown: Object.fromEntries(deviceStats),
      geo_distribution: Object.fromEntries(geoStats),
      daily_active_users: Array.from(userRetention.entries()).map(([date, users]) => ({
        date,
        users: users.size
      }))
    };
  }
}
