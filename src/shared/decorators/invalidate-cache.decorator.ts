import { SetMetadata } from '@nestjs/common';

export const INVALIDATE_CACHE_KEY = 'invalidate-cache';

export interface InvalidateCacheOptions {
  entity: string;
  id?: string | number;
}

export const InvalidateCache = (options: InvalidateCacheOptions) =>
  SetMetadata(INVALIDATE_CACHE_KEY, options);
