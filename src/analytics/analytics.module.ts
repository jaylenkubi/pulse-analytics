import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    CacheModule.register()
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
