import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';

export class AuditLogResponseDto extends BaseResponseDto {
    @ApiProperty({ description: 'User who performed the action' })
    user: {
        id: string;
        email: string;
    };

    @ApiProperty({ description: 'Action performed' })
    action: string;

    @ApiProperty({ description: 'Resource being acted upon' })
    resource: string;

    @ApiProperty({ 
        description: 'Status of the action',
        enum: ['success', 'failure']
    })
    status: 'success' | 'failure';

    @ApiProperty({ description: 'IP address of the request' })
    ipAddress: string;

    @ApiProperty({ description: 'User agent of the request' })
    userAgent: string;

    @ApiProperty({ description: 'Additional details about the action' })
    details?: Record<string, any>;
}
