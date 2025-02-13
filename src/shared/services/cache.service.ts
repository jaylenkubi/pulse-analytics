import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Invalidate cache keys by pattern
   * @param pattern - Pattern to match cache keys (e.g., 'users*', 'posts:*')
   */
  async invalidateByPattern(pattern: string): Promise<void> {
    const store = this.cacheManager.store;
    
    if (typeof store['keys'] === 'function') {
      const keys = await store['keys'](pattern);
      const promises = keys.map(key => this.cacheManager.del(key));
      await Promise.all(promises);
    }
  }

  /**
   * Invalidate specific cache key
   * @param key - Exact cache key to invalidate
   */
  async invalidate(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  /**
   * Get cache key patterns for different entities
   * @param entityName - Name of the entity (e.g., 'users', 'posts')
   * @param id - Optional ID for specific entity
   */
  getCacheKeyPattern(entityName: string, id?: string | number): string {
    return id ? `${entityName}:${id}*` : `${entityName}*`;
  }
}
