import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSessionDto {
    @ApiProperty({ description: 'ID of the user for this session' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Session token', required: false })
    @IsString()
    @IsOptional()
    token?: string;

    @ApiProperty({ description: 'IP address of the client', required: false })
    @IsString()
    @IsOptional()
    ipAddress?: string;

    @ApiProperty({ description: 'User agent of the client', required: false })
    @IsString()
    @IsOptional()
    userAgent?: string;

    @ApiProperty({ description: 'Whether the session is valid', default: true })
    @IsBoolean()
    @IsOptional()
    isValid?: boolean;

    @ApiProperty({ description: 'When the session expires' })
    @IsDate()
    @Type(() => Date)
    expiresAt: Date;
}
