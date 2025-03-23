import { ApiProperty } from '@nestjs/swagger';
import { WebsiteAccessLevel } from '../../../database/entities/website-access.entity';
import { FeatureResponseDto } from './feature-response.dto';

export class AccessLevelFeatureResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the access level feature relationship',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string;

    @ApiProperty({
        description: 'Access level',
        example: 'admin',
        enum: WebsiteAccessLevel
    })
    accessLevel: WebsiteAccessLevel;

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
        description: 'Permission settings for this feature and access level',
        example: {
            canView: true,
            canEdit: true,
            canManage: false
        }
    })
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canManage: boolean;
    };

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
