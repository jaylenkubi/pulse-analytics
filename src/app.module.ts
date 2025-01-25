import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitGuard } from '@shared/guards/rate-limit.guard';
import { BullModule } from '@nestjs/bullmq';
import { AnalyticsModule } from '@modules/analytics/analytics.module';
import { AuditLogModule } from '@modules/audit-log/audit-log.module';
import { AuthModule } from '@modules/auth/auth.module';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { DataCollectorModule } from '@modules/data-collector/data-collector.module';
import { SessionModule } from '@modules/session/session.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        secretRefresh: configService.get('jwt.refreshSecret'),
      }),
      inject: [ConfigService],
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
    UserModule,
    SessionModule,
    AuthModule,
    AnalyticsModule,
    DataCollectorModule,
    AuditLogModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
  exports: [],
})
export class AppModule { }
