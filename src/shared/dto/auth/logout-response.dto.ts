import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
    @ApiProperty({ description: 'Response message' })
    message: string;
}
