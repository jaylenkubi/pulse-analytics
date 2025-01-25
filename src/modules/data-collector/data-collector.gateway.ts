import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { DataCollectorService } from './data-collector.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
  namespace: 'event',
})
export class DataCollectorGateway {
  constructor(private dataCollectorService: DataCollectorService) {}

  @SubscribeMessage('collectEvent')
  async handleEvent(
    @MessageBody() eventData: any,
    @ConnectedSocket() client: Socket,
  ) {
    await this.dataCollectorService.collectEvent(eventData);
    client.emit('eventCollected', { event: 'collectEvent', data: eventData });
  }
}
