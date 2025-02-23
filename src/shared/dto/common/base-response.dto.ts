import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
    @ApiProperty({ description: 'Unique identifier' })
    id: string;

    @ApiProperty({ description: 'Creation timestamp' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    updatedAt?: Date;
}
