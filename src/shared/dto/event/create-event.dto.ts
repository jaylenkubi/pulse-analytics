import { IsString, IsNotEmpty, IsObject, IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EventName } from '@/types/event.type';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  anonymousId: string;

  @IsObject()
  @IsOptional()
  preferences: Record<string, any>;
}

export class DeviceDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  browser: string;

  @IsString()
  @IsNotEmpty()
  os: string;

  @IsString()
  @IsNotEmpty()
  screenResolution: string;
}

export class GeoDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}

export class ContextDto {
  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  userAgent: string;

  @IsString()
  @IsNotEmpty()
  locale: string;

  @ValidateNested()
  @Type(() => DeviceDto)
  device: DeviceDto;

  @ValidateNested()
  @Type(() => GeoDto)
  geo: GeoDto;
}

export class TrafficDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  medium: string;

  @IsString()
  @IsOptional()
  campaign?: string;

  @IsString()
  @IsOptional()
  term?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class PageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsOptional()
  referrer?: string;
}

export class MetricsDto {
  @IsNotEmpty()
  engagement_time_ms: number;

  @IsNotEmpty()
  pages_viewed: number;

  @IsNotEmpty()
  bounced: boolean;

  @IsNotEmpty()
  converted: boolean;

  @IsNotEmpty()
  scrollDepth: number;

  @IsNotEmpty()
  loadTimeMs: number;

  @IsNotEmpty()
  interactions: number;

  @IsNotEmpty()
  errors: number;
}

export class PulseAnalyticsDto {
  @IsString()
  @IsNotEmpty()
  dashboardType: string;

  @IsNotEmpty()
  chartInteractions: number;

  @IsObject()
  @IsNotEmpty()
  filterUsage: Record<string, number>;

  @IsNotEmpty()
  dataExports: number;

  @IsNotEmpty()
  customReports: number;
}

export class CreateEventDto {
  @IsEnum(EventName)
  @IsNotEmpty()
  eventName: EventName;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ValidateNested()
  @Type(() => ContextDto)
  context: ContextDto;

  @ValidateNested()
  @Type(() => TrafficDto)
  traffic: TrafficDto;

  @ValidateNested()
  @Type(() => PageDto)
  page: PageDto;

  @ValidateNested()
  @Type(() => MetricsDto)
  metrics: MetricsDto;

  @ValidateNested()
  @Type(() => PulseAnalyticsDto)
  pulseAnalytics: PulseAnalyticsDto;
}
