import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { DataCollectorService } from './data-collector.service';
import { CreateEventDto } from '@shared/dto';

@Controller('data-collector')
export class DataCollectorController {
  constructor(private readonly dataCollectorService: DataCollectorService) {}

  @Post('event')
  @UsePipes(new ValidationPipe({ transform: true }))
  async collectEvent(@Body() eventData: CreateEventDto) {
    return this.dataCollectorService.collectEvent(eventData);
  }
}