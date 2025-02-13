import {
  Injectable,
  ExecutionContext,
  CallHandler,
  Inject,

} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Reflector } from '@nestjs/core';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  private getPath(request: Request): string {
    return request.path || request.url?.split('?')[0] || '';
  }

  private getEntityFromPath(request: Request): string {
    const path = this.getPath(request);
    // Remove leading slash and get first segment
    const segments = path.split('/').filter(Boolean);
    return segments[0] || 'default';
  }

  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Don't cache if:
    if (
      request.method !== 'GET' || // Not a GET request
      (request.headers['cache-control'] && 
       request.headers['cache-control'].includes('no-cache')) // Has no-cache header
    ) {
      return undefined;
    }

    // Get entity name from the request
    const entity = this.getEntityFromPath(request);
    
    // Extract ID from path if it exists
    const path = this.getPath(request);
    const pathSegments = path.split('/').filter(Boolean);
    const id = pathSegments.length > 1 ? pathSegments[1] : undefined;
    
    // Create base key with entity and optional ID
    const baseKey = id ? `${entity}:${id}` : entity;
    
    // Add query parameters to key if they exist
    const queryParams = request.query ? new URLSearchParams(request.query as any).toString() : '';
    
    return queryParams ? `${baseKey}:${queryParams}` : baseKey;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);

    if (!key) {
      return next.handle();
    }

    try {
      const value = await this.cacheManager.get(key);
      if (value) {
        return of(value);
      }

      return next.handle().pipe(
        tap(response => {
          // Get TTL from route decorator or use default
          const ttl = this.reflector.get('cache-ttl', context.getHandler()) ?? 60000; // default 1 minute
          this.cacheManager.set(key, response, ttl);
        }),
      );
    } catch (error) {
      // If there's any cache error, just continue without caching
      return next.handle();
    }
  }
}
