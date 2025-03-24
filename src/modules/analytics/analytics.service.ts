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
        eventName: EventName.PAGE_VIEW,
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        websiteId: websiteId
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
        uniqueVisitors: new Set(),
        totalEngagementTime: 0,
        bounceCount: 0,
        count: 0
      };
      
      stats.visits++;
      stats.uniqueVisitors.add(event.user?.id);
      stats.totalEngagementTime += Number(event.metrics?.engagementTimeMs || '0');
      if (event.metrics?.bounced) {
        stats.bounceCount++;
      }
      stats.count++;
      
      statsMap.set(key, stats);
    });
    
    return Array.from(statsMap.values()).map(stats => ({
      source: stats.source,
      medium: stats.medium,
      visits: stats.visits,
      uniqueVisitors: stats.uniqueVisitors.size,
      avgEngagementTime: stats.totalEngagementTime / stats.count,
      bounceRate: stats.bounceCount / stats.count
    }));
  }

  async getPagePerformance(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        eventName: EventName.PAGE_VIEW,
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        websiteId: websiteId
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
        totalLoadTime: 0,
        totalScrollDepth: 0,
        count: 0
      };
      
      stats.pageviews++;
      stats.totalLoadTime += Number(event.metrics?.loadTimeMs || '0');
      stats.totalScrollDepth += Number(event.metrics?.scrollDepth || '0');
      stats.count++;
      
      statsMap.set(path, stats);
    });
    
    return Array.from(statsMap.values()).map(stats => ({
      path: stats.path,
      pageviews: stats.pageviews,
      avgLoadTime: stats.totalLoadTime / stats.count,
      avgScrollDepth: stats.totalScrollDepth / stats.count
    }));
  }

  async getUserBehavior(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        websiteId: websiteId
      },
      select: [
        'user',
        'eventName',
        'metrics'
      ]
    };

    const events = await this.eventService.getByQuery(query);
    
    const statsMap = new Map<string, any>();
    
    events.forEach(event => {
      const userId = event.user?.id || 'unknown';
      const stats = statsMap.get(userId) || {
        userId: userId,
        totalEvents: 0,
        pageviews: 0,
        totalEngagementTime: 0,
        count: 0
      };
      
      stats.totalEvents++;
      if (event.eventName === EventName.PAGE_VIEW) {
        stats.pageviews++;
      }
      stats.totalEngagementTime += Number(event.metrics?.engagementTimeMs || '0');
      stats.count++;
      
      statsMap.set(userId, stats);
    });
    
    return Array.from(statsMap.values()).map(stats => ({
      userId: stats.userId,
      totalEvents: stats.totalEvents,
      pageviews: stats.pageviews,
      avgEngagementTime: stats.totalEngagementTime / stats.count
    }));
  }

  async getRealtimeAnalytics(websiteId: string) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const query: FindManyOptions<Event> = {
      where: {
        timestamp: Between(fiveMinutesAgo.toISOString(), new Date().toISOString()),
        websiteId: websiteId
      },
      order: {
        timestamp: 'DESC'
      },
      take: 100
    };

    const events = await this.eventService.getByQuery(query);
    
    const activePages = new Map<string, number>();
    const recentEvents = events.slice(0, 10).map(event => ({
      type: event.eventName,
      page: event.page?.path,
      timestamp: event.timestamp
    }));
    
    events.forEach(event => {
      if (event.eventName === EventName.PAGE_VIEW) {
        const path = event.page?.path || 'unknown';
        activePages.set(path, (activePages.get(path) || 0) + 1);
      }
    });

    return {
      activeVisitors: new Set(events.map(e => e.user?.id)).size,
      activePages: Array.from(activePages.entries()).map(([path, count]) => ({
        path,
        visitors: count
      })).sort((a, b) => b.visitors - a.visitors).slice(0, 5),
      recentEvents: recentEvents,
      eventsPerMinute: events.length / 5
    };
  }

  async getAudienceAnalytics(startDate: Date, endDate: Date, websiteId: string) {
    const query: FindManyOptions<Event> = {
      where: {
        timestamp: Between(startDate.toISOString(), endDate.toISOString()),
        websiteId: websiteId
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
      totalUsers: new Set(events.map(e => e.user?.id)).size,
      deviceBreakdown: Object.fromEntries(deviceStats),
      geoDistribution: Object.fromEntries(geoStats),
      dailyActiveUsers: Array.from(userRetention.entries()).map(([date, users]) => ({
        date,
        users: users.size
      }))
    };
  }
}
