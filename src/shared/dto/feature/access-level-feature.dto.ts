import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { WebsiteAccessLevel } from '../../../database/entities/website-access.entity';

export class AccessLevelFeatureDto {
    @IsString()
    @IsNotEmpty()
    featureName: string;

    @IsEnum(WebsiteAccessLevel)
    @IsNotEmpty()
    accessLevel: WebsiteAccessLevel;

    @IsObject()
    @IsNotEmpty()
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canManage: boolean;
    };
}
