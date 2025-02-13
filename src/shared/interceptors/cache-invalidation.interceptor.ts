import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { INVALIDATE_CACHE_KEY, InvalidateCacheOptions } from '../decorators/invalidate-cache.decorator';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInvalidationInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private cacheService: CacheService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async () => {
        const invalidateOptions = this.reflector.get<InvalidateCacheOptions>(
          INVALIDATE_CACHE_KEY,
          context.getHandler(),
        );

        if (invalidateOptions) {
          const { entity, id } = invalidateOptions;
          const pattern = this.cacheService.getCacheKeyPattern(entity, id);
          await this.cacheService.invalidateByPattern(pattern);
        }
      }),
    );
  }
}
