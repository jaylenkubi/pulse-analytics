import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TimeRangeDto, EventTimelineDto } from '@shared/dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get event statistics' })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getEventStats(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getEventStats({
      start: new Date(timeRange.start),
      end: new Date(timeRange.end),
    });
  }

  @Get('realtime')
  @ApiOperation({ summary: 'Get realtime events' })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getRealtimeEvents() {
    return this.analyticsService.getRealtimeEvents();
  }

  @Get('timeline')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get event timeline' })
  @Roles(Role.ADMIN, Role.ANALYST)
  async getEventTimeline(@Query() query: EventTimelineDto) {
    return this.analyticsService.getEventTimeline(
      query.eventType,
      query.interval,
      {
        start: new Date(query.start),
        end: new Date(query.end),
      },
    );
  }
}