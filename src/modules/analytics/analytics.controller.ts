import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TimeRangeDto, EventTimelineDto } from '@shared/dto';
import { HttpCacheInterceptor } from '@shared/interceptors/http-cache.interceptor';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { SwaggerRoute } from '@shared/decorators/swagger.decorator';
import { CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(RolesGuard)
@UseInterceptors(HttpCacheInterceptor)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get event statistics',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' }
    }
  })
  async getEventStats(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getEventStats({
      start: new Date(timeRange.start),
      end: new Date(timeRange.end)
    });
  }

  @Get('realtime')
  @SwaggerRoute({
    summary: 'Get realtime events'
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getRealtimeEvents() {
    return this.analyticsService.getRealtimeEvents();
  }

  @Get('timeline')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get event timeline',
    query: {
      eventType: { type: 'string' },
      interval: { type: 'string' },
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' },
      page: { type: 'number', minimum: 1, default: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100, default: 20 }
    }
  })
  async getEventTimeline(@Query() query: EventTimelineDto) {
    return this.analyticsService.getEventTimeline(
      query.eventType,
      query.interval,
      {
        start: new Date(query.start),
        end: new Date(query.end),
        page: query.page,
        limit: query.limit
      } as { start: Date; end: Date; page?: number; limit?: number }
    );
  }
}