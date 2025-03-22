import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { WebsiteAccessLevel } from '../../../database/entities/website-access.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AccessLevelFeatureDto {
    @ApiProperty({
        description: 'Name of the feature to set access level for',
        example: 'realtime-analytics'
    })
    @IsString()
    @IsNotEmpty()
    featureName: string;

    @ApiProperty({
        description: 'Access level to set permissions for',
        example: 'ADMIN',
        enum: WebsiteAccessLevel
    })
    @IsEnum(WebsiteAccessLevel)
    @IsNotEmpty()
    accessLevel: WebsiteAccessLevel;

    @ApiProperty({
        description: 'Permission settings for this feature and access level',
        example: {
            canView: true,
            canEdit: true,
            canManage: false
        }
    })
    @IsObject()
    @IsNotEmpty()
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canManage: boolean;
    };
}
