import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WebsiteFeatureDto {
    @ApiProperty({
        description: 'UUID of the website to enable the feature for',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    @IsNotEmpty()
    websiteId: string;

    @ApiProperty({
        description: 'Name of the feature to enable',
        example: 'realtime-analytics'
    })
    @IsString()
    @IsNotEmpty()
    featureName: string;

    @ApiProperty({
        description: 'Whether the feature is enabled for this website',
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    isEnabled: boolean;

    @ApiProperty({
        description: 'Website-specific configuration for the feature',
        example: {
            refreshInterval: 30,
            maxDataPoints: 100,
            enableNotifications: true
        },
        required: false
    })
    @IsObject()
    @IsOptional()
    configuration?: Record<string, any>;
}
