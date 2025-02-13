import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { DataCollectorService } from './data-collector.service';
import { CreateEventDto } from '@shared/dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { RateLimitGuard } from '@shared/guards/rate-limit.guard';
import { RateLimit } from '@shared/decorators/rate-limit.decorator';
import { CacheInvalidationInterceptor } from '@shared/interceptors/cache-invalidation.interceptor';
import { InvalidateCache } from '@shared/decorators/invalidate-cache.decorator';
import { SwaggerRoute } from '@shared/decorators/swagger.decorator';

@ApiTags('Data Collector')
@Controller('data-collector')
@UseGuards(RolesGuard, RateLimitGuard)
export class DataCollectorController {
  constructor(private readonly dataCollectorService: DataCollectorService) {}

  @Post('event')
  @SwaggerRoute({
    summary: 'Collect event data',
    requestType: CreateEventDto
  })
  @Roles(Role.ADMIN, Role.ANALYST, Role.USER)
  @RateLimit({
    points: 100,
    duration: 60,
    blockDuration: 120
  })
  @UseInterceptors(CacheInvalidationInterceptor)
  @InvalidateCache({ entity: 'analytics' })
  @UsePipes(ValidationPipe)
  async collectEvent(@Body() eventData: CreateEventDto) {
    return this.dataCollectorService.collectEvent(eventData);
  }
}