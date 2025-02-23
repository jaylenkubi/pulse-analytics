import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsEnum } from 'class-validator';

enum AuditLogStatus {
    SUCCESS = 'success',
    FAILURE = 'failure'
}

export class CreateAuditLogDto {
    @ApiProperty({ description: 'ID of the user performing the action' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Action performed' })
    @IsString()
    action: string;

    @ApiProperty({ description: 'Resource being acted upon' })
    @IsString()
    resource: string;

    @ApiProperty({ 
        description: 'Status of the action',
        enum: AuditLogStatus,
        example: 'success'
    })
    @IsEnum(AuditLogStatus)
    status: 'success' | 'failure';

    @ApiProperty({ description: 'IP address of the request' })
    @IsString()
    ipAddress: string;

    @ApiProperty({ description: 'User agent of the request', required: false })
    @IsString()
    @IsOptional()
    userAgent?: string;

    @ApiProperty({ description: 'Additional details about the action', required: false })
    @IsObject()
    @IsOptional()
    details?: Record<string, any>;
}
