import { ApiProperty } from '@nestjs/swagger';
import { FeatureResponseDto } from './feature-response.dto';

export class WebsiteFeatureResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the website feature relationship',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string;

    @ApiProperty({
        description: 'UUID of the website',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    websiteId: string;

    @ApiProperty({
        description: 'ID of the feature',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    featureId: string;

    @ApiProperty({
        description: 'Feature details',
        type: () => FeatureResponseDto
    })
    feature?: FeatureResponseDto;

    @ApiProperty({
        description: 'Whether the feature is enabled for this website',
        example: true
    })
    isEnabled: boolean;

    @ApiProperty({
        description: 'Website-specific configuration for the feature',
        example: {
            refreshInterval: 30,
            maxDataPoints: 100,
            enableNotifications: true
        }
    })
    configuration?: Record<string, any>;

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
