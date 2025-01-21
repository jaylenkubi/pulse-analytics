import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DataCollectorService } from './data-collector.service';
import { CreateEventDto } from '@shared/dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { RateLimitGuard } from '@shared/guards/rate-limit.guard';
import { RateLimit } from '@shared/decorators/rate-limit.decorator';

@ApiTags('Data Collector')
@Controller('data-collector')
@UseGuards(RolesGuard, RateLimitGuard)
export class DataCollectorController {
  constructor(private readonly dataCollectorService: DataCollectorService) {}

  @Post('event')
  @ApiOperation({ summary: 'Collect event data' })
  @Roles(Role.ADMIN, Role.ANALYST, Role.USER)
  @RateLimit({
    points: 100,
    duration: 60,
    blockDuration: 120
  })
  @UsePipes(ValidationPipe)
  async collectEvent(@Body() eventData: CreateEventDto) {
    return this.dataCollectorService.collectEvent(eventData);
  }
}