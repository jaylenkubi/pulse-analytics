import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SetupWebsiteDto {
  @ApiProperty({ description: 'Name of the website' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'List of domains associated with this website' })
  @IsArray()
  @IsString({ each: true })
  domains: string[];

  @ApiProperty({ description: 'User ID who will be the owner of this website' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Tracking ID for the website', required: false })
  @IsUUID()
  @IsOptional()
  trackingId?: string;

  @ApiProperty({ description: 'List of feature names to enable for this website', required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
}
