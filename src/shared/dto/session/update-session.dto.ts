import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSessionDto {
    @ApiProperty({ description: 'Session token', required: false })
    @IsString()
    @IsOptional()
    token?: string;

    @ApiProperty({ description: 'Whether the session is valid', required: false })
    @IsBoolean()
    @IsOptional()
    isValid?: boolean;

    @ApiProperty({ description: 'When the session expires', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    expiresAt?: Date;
}
