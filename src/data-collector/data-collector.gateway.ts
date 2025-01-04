import {  MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { DataCollectorService } from './data-collector.service';
import { ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from '@shared/dto';

@WebSocketGateway({
  cors: true,
  namespace: 'events',
})
export class DataCollectorGateway {
  constructor(private readonly dataCollectorService: DataCollectorService) {}

  @SubscribeMessage('collectEvent')
  async handleEvent(
    @MessageBody(new ValidationPipe()) eventData: CreateEventDto,
  ) {
    return this.dataCollectorService.collectEvent(eventData);
  }
}

