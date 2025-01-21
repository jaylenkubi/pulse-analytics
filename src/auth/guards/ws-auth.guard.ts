import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient();
      const token = this.extractTokenFromHeader(client);
      
      if (!token) {
        throw new WsException('Unauthorized');
      }

      const payload = await this.jwtService.verifyAsync(token);
      context.switchToWs().getData().user = payload;
      
      return true;
    } catch {
      throw new WsException('Unauthorized');
    }
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const auth = client.handshake.headers.authorization;
    const [type, token] = auth?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
