import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum } from 'class-validator';
import { WebsiteAccessLevel } from '@entities/website-access.entity';

export class CreateWebsiteAccessDto {
    @ApiProperty({ description: 'ID of the website' })
    @IsUUID()
    website_id: string;

    @ApiProperty({ description: 'ID of the user to grant access' })
    @IsUUID()
    user_id: string;

    @ApiProperty({ 
        description: 'Access level for the user',
        enum: WebsiteAccessLevel,
        default: WebsiteAccessLevel.VIEWER
    })
    @IsEnum(WebsiteAccessLevel)
    access_level: WebsiteAccessLevel;
}
