import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeatureDto {
    @ApiProperty({
        description: 'Updated description of what the feature does',
        example: 'Provides enhanced real-time analytics and visitor tracking',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Updated category the feature belongs to',
        example: 'analytics',
        enum: ['analytics', 'reporting', 'settings', 'user-management'],
        required: false
    })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiProperty({
        description: 'Whether the feature is available to all websites by default',
        example: true,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isGloballyAvailable?: boolean;
}
