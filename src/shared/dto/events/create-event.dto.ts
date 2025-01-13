import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventType: string;

  @IsObject()
  @ApiProperty({ required: false })
  payload: Record<string, any>;

  @IsISO8601()
  @IsOptional()
  @ApiProperty()
  timestamp?: string;
}
