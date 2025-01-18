import { Controller, Get, Query, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AnalyticsService } from './analytics.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TimeRangeDto } from '@shared/dto/event/timeRange.dto';
import { EventTimelineDto } from '@shared/dto/event/eventTime.dto';


@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get event statistics' })
  async getEventStats(@Query() timeRange: TimeRangeDto) {
    return this.analyticsService.getEventStats({
      start: new Date(timeRange.start),
      end: new Date(timeRange.end),
    });
  }

  @Get('realtime')
  @ApiOperation({ summary: 'Get realtime events' })
  async getRealtimeEvents() {
    return this.analyticsService.getRealtimeEvents();
  }

  @Get('timeline')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get event timeline' })
  async getEventTimeline(@Query() query: EventTimelineDto) {
    return this.analyticsService.getEventTimeline(
      query.eventType,
      query.interval,
      {
        start: new Date(query.start),
        end: new Date(query.end),
      }
    );
  }
}