import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RATE_LIMIT_KEY, RateLimitOptions } from '../decorators/rate-limit.decorator';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rateLimit = this.reflector.get<RateLimitOptions>(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!rateLimit) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const key = `rate-limit:${payload.sub}:${context.getClass().name}:${context.getHandler().name}`;
      
      const current = await this.cacheManager.get<number>(key);
      
      if (current === undefined) {
        await this.cacheManager.set(key, 1, rateLimit.duration * 1000);
        return true;
      }

      if (current >= rateLimit.points) {
        throw new HttpException({
          message: 'Too Many Requests',
          retryAfter: rateLimit.blockDuration || rateLimit.duration,
        }, HttpStatus.TOO_MANY_REQUESTS);
      }

      await this.cacheManager.set(key, current + 1, rateLimit.duration * 1000);
      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
