import { ApiProperty } from '@nestjs/swagger';

export class FeatureResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the feature',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string;

    @ApiProperty({
        description: 'Unique name identifier for the feature',
        example: 'realtime-analytics'
    })
    name: string;

    @ApiProperty({
        description: 'Description of what the feature does',
        example: 'Provides real-time analytics and visitor tracking'
    })
    description: string;

    @ApiProperty({
        description: 'Category the feature belongs to',
        example: 'analytics',
        enum: ['analytics', 'reporting', 'settings', 'user-management']
    })
    category: string;

    @ApiProperty({
        description: 'Whether the feature is available to all websites by default',
        example: true
    })
    isGloballyAvailable: boolean;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2023-01-01T00:00:00.000Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2023-01-02T00:00:00.000Z'
    })
    updatedAt: Date;
}
