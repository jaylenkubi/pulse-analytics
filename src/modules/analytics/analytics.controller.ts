import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TimeRangeDto } from '@shared/dto';
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

  @Get('traffic')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get traffic source statistics',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getTrafficSourceStats(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getTrafficSourceStats(
      new Date(timeRange.start),
      new Date(timeRange.end)
    );
  }

  @Get('pages')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get page performance statistics',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getPagePerformance(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getPagePerformance(
      new Date(timeRange.start),
      new Date(timeRange.end)
    );
  }

  @Get('users')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get user behavior statistics',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getUserBehavior(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getUserBehavior(
      new Date(timeRange.start),
      new Date(timeRange.end)
    );
  }

  @Get('realtime')
  @SwaggerRoute({
    summary: 'Get realtime analytics data',
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getRealtimeAnalytics() {
    return this.analyticsService.getRealtimeAnalytics();
  }

  @Get('audience')
  @CacheTTL(300000) // Cache for 5 minutes
  @SwaggerRoute({
    summary: 'Get audience analytics',
    query: {
      start: { type: 'string', format: 'date-time' },
      end: { type: 'string', format: 'date-time' }
    }
  })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getAudienceAnalytics(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getAudienceAnalytics(
      new Date(timeRange.start),
      new Date(timeRange.end)
    );
  }
}