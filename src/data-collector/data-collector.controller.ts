import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { DataCollectorService } from './data-collector.service';
import { CreateEventDto } from '@shared/dto';

@Controller('data-collector')
export class DataCollectorController {
  constructor(private readonly dataCollectorService: DataCollectorService) {}

  @Post('event')
  async collectEvent(@Body() eventData: any) {
    return this.dataCollectorService.collectEvent(eventData);
  }
}