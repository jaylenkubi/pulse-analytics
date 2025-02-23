import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';
import { WebsiteAccessLevel } from '@entities/website-access.entity';

export class WebsiteAccessResponseDto extends BaseResponseDto {
    @ApiProperty({ description: 'Website information' })
    website: {
        id: string;
        name: string;
    };

    @ApiProperty({ description: 'User information' })
    user: {
        id: string;
        email: string;
    };

    @ApiProperty({ 
        description: 'Access level for the user',
        enum: WebsiteAccessLevel
    })
    access_level: WebsiteAccessLevel;
}
