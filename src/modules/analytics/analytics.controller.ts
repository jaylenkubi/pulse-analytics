import { Controller, Get, Query, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TimeRangeDto } from '@shared/dto';
import { HttpCacheInterceptor } from '@shared/interceptors/http-cache.interceptor';
import { Role } from '@modules/auth/enums/roles.enum';
import { SwaggerRoute } from '@shared/decorators/swagger.decorator';
import { CacheTTL } from '@nestjs/cache-manager';
import { FeatureGuard } from '@shared/guards/feature.guard';
import { RequiresFeature, RequiresFeatures, RequiresAnyFeature } from '@shared/decorators/requires-feature.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { RolesGuard } from '@modules/auth/guards/roles.guard';

@ApiTags('Analytics')
@Controller('websites/:websiteId/analytics')
@UseGuards(JwtAuthGuard, RolesGuard, FeatureGuard)
@UseInterceptors(HttpCacheInterceptor)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('traffic')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get traffic source statistics',
    operationId: 'getTrafficSourceStats',
    responseType: Object,
    description: 'Returns traffic source statistics for the specified time range',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' },
      limit: { type: 'number', default: 10 },
      offset: { type: 'number', default: 0 }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  @RequiresFeature('analytics-traffic')
  async getTrafficSourceStats(@Param('websiteId') websiteId: string, @Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getTrafficSourceStats(
      new Date(timeRange.start),
      new Date(timeRange.end),
      websiteId
    );
  }

  @Get('pages')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get page performance statistics',
    operationId: 'getPagePerformanceStats',
    responseType: Object,
    description: 'Returns page performance statistics for the specified time range',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' },
      limit: { type: 'number', default: 10 },
      offset: { type: 'number', default: 0 }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  @RequiresFeature('analytics-pages')
  async getPagePerformance(@Param('websiteId') websiteId: string, @Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getPagePerformance(
      new Date(timeRange.start),
      new Date(timeRange.end),
      websiteId
    );
  }

  @Get('users')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get user behavior statistics',
    operationId: 'getUserBehaviorStats',
    responseType: Object,
    description: 'Returns user behavior statistics for the specified time range',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' },
      limit: { type: 'number', default: 10 },
      offset: { type: 'number', default: 0 }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  @RequiresFeature('analytics-user-behavior')
  async getUserBehavior(@Param('websiteId') websiteId: string, @Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getUserBehavior(
      new Date(timeRange.start),
      new Date(timeRange.end),
      websiteId
    );
  }

  @Get('realtime')
  @SwaggerRoute({
    summary: 'Get realtime analytics data',
    operationId: 'getRealtimeAnalytics',
    responseType: Object,
    description: 'Returns realtime analytics data'
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  @RequiresFeature('analytics-realtime')
  async getRealtimeAnalytics(@Param('websiteId') websiteId: string) {
    return this.analyticsService.getRealtimeAnalytics(websiteId);
  }

  @Get('audience')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get audience analytics',
    operationId: 'getAudienceAnalytics',
    responseType: Object,
    description: 'Returns audience analytics for the specified time range',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' },
      limit: { type: 'number', default: 10 },
      offset: { type: 'number', default: 0 }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  @RequiresAnyFeature(['analytics-audience', 'analytics-premium'])
  async getAudienceAnalytics(@Param('websiteId') websiteId: string, @Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getAudienceAnalytics(
      new Date(timeRange.start),
      new Date(timeRange.end),
      websiteId
    );
  }
}