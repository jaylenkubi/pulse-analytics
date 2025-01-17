import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { DataCollectorModule } from './data-collector/data-collector.module';
import { EventProcessorModule } from './event-processor/event-processor.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { BullModule } from '@nestjs/bullmq';
import { Event } from './entities/event.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): TypeOrmModuleOptions => {
        const dbConfig = configService.get('database');
        return {
          type: 'postgres' as const,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [Event],
          autoLoadEntities: true,
          synchronize: false,
          ssl: dbConfig.ssl,
          retryAttempts: 3,
          retryDelay: 3000,
          keepConnectionAlive: true,
          migrations: [__dirname + '/migrations/*.{js,ts}'],
          migrationsRun: true,
        };
      }
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            ...configService.get('dragonfly'),
          },
        });
        return {
          store: store as unknown as CacheStore,
          ttl: 60000,
          max: 100,
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('queue.host'),
          port: configService.get('queue.port'),
        },
      }),
    }),
    DataCollectorModule,
    EventProcessorModule,
    AnalyticsModule,
    UserModule,
    AuthModule,
    EventModule,
  ],
})
export class AppModule {}
