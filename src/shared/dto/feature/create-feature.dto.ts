import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
    @ApiProperty({
        description: 'Unique name identifier for the feature',
        example: 'realtime-analytics'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of what the feature does',
        example: 'Provides real-time analytics and visitor tracking'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Category the feature belongs to',
        example: 'analytics',
        enum: ['analytics', 'reporting', 'settings', 'user-management']
    })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        description: 'Whether the feature is available to all websites by default',
        example: true,
        default: true,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isGloballyAvailable?: boolean;
}
