import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUUID, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class WebsiteSettings {
    @ApiProperty({ description: 'Tracking options for the website', required: false })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    tracking_options?: string[];

    @ApiProperty({ description: 'Paths to exclude from tracking', required: false })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    excluded_paths?: string[];

    @ApiProperty({ description: 'Custom variables for tracking', required: false })
    @IsObject()
    @IsOptional()
    custom_variables?: Record<string, string>;
}

export class CreateWebsiteDto {
    @ApiProperty({ description: 'Name of the website' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'List of domains associated with this website' })
    @IsArray()
    @IsString({ each: true })
    domains: string[];

    @ApiProperty({ description: 'Website settings', required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => WebsiteSettings)
    settings?: WebsiteSettings;
}
