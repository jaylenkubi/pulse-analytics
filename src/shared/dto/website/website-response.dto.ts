import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';

export class WebsiteResponseDto extends BaseResponseDto {
    @ApiProperty({ description: 'Name of the website' })
    name: string;

    @ApiProperty({ description: 'List of domains associated with this website' })
    domains: string[];

    @ApiProperty({ description: 'Unique tracking ID for this website' })
    tracking_id: string;

    @ApiProperty({ description: 'Website settings' })
    settings: {
        tracking_options: string[];
        excluded_paths: string[];
        custom_variables: Record<string, string>;
    };

    @ApiProperty({ description: 'Owner ID of the website' })
    owner: {
        id: string;
        email: string;
    };
}
