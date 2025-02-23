import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';

export class SessionResponseDto extends BaseResponseDto {
    @ApiProperty({ description: 'User information' })
    user: {
        id: string;
        email: string;
    };

    @ApiProperty({ description: 'IP address of the client' })
    ipAddress: string;

    @ApiProperty({ description: 'User agent of the client' })
    userAgent: string;

    @ApiProperty({ description: 'Whether the session is valid' })
    isValid: boolean;

    @ApiProperty({ description: 'When the session expires' })
    expiresAt: Date;
}
