import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateWebsiteSettings {
    @ApiProperty({ description: 'Tracking options for the website', required: false })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    trackingOptions?: string[];

    @ApiProperty({ description: 'Paths to exclude from tracking', required: false })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    excludedPaths?: string[];

    @ApiProperty({ description: 'Custom variables for tracking', required: false })
    @IsObject()
    @IsOptional()
    customVariables?: Record<string, string>;
}

export class UpdateWebsiteDto {
    @ApiProperty({ description: 'Name of the website', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'List of domains associated with this website', required: false })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    domains?: string[];

    @ApiProperty({ description: 'Website settings', required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateWebsiteSettings)
    settings?: UpdateWebsiteSettings;
}
