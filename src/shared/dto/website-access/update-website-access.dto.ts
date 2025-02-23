import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WebsiteAccessLevel } from '@entities/website-access.entity';

export class UpdateWebsiteAccessDto {
    @ApiProperty({ 
        description: 'Access level for the user',
        enum: WebsiteAccessLevel
    })
    @IsEnum(WebsiteAccessLevel)
    access_level: WebsiteAccessLevel;
}
