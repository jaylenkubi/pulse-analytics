import { Global, Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { CacheInvalidationInterceptor } from './interceptors/cache-invalidation.interceptor';
import { HttpCacheInterceptor } from './interceptors/http-cache.interceptor';

@Global()
@Module({
  providers: [CacheService, CacheInvalidationInterceptor, HttpCacheInterceptor],
  exports: [CacheService, CacheInvalidationInterceptor, HttpCacheInterceptor],
})
export class SharedModule {}
