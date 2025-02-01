import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { TimeRangeDto } from './timeRange.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EventTimelineDto extends TimeRangeDto {
  @ApiProperty({ example: 'pageView' })
  @IsString()
  eventType: string;

  @ApiProperty({ enum: ['1m', '5m', '1h'] })
  @IsEnum(['1m', '5m', '1h'])
  interval: '1m' | '5m' | '1h' = '5m';

  @ApiProperty({ required: false, example: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsNumber()
  @IsOptional()
  limit?: number;
}