import { IsISO8601, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TimeRangeDto {
  @ApiProperty({ example: '2024-03-01T00:00:00Z' })
  @IsISO8601()
  @IsNotEmpty()
  start: string;

  @ApiProperty({ example: '2024-03-02T00:00:00Z' })
  @IsISO8601()
  @IsNotEmpty()
  end: string;
}