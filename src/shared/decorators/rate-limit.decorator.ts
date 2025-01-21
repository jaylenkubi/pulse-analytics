import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rateLimit';

export interface RateLimitOptions {
  points: number;      // Number of requests
  duration: number;    // Time window in seconds
  blockDuration?: number; // Block duration in seconds if limit is exceeded
}

export const RateLimit = (options: RateLimitOptions) => SetMetadata(RATE_LIMIT_KEY, options);
