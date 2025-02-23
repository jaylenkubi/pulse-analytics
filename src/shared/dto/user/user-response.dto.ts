import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';
import { Role } from '@modules/auth/enums/roles.enum';

export class UserResponseDto extends BaseResponseDto {
    @ApiProperty({ description: 'User\'s first name' })
    firstName: string;

    @ApiProperty({ description: 'User\'s last name' })
    lastName: string;

    @ApiProperty({ description: 'User\'s email address' })
    email: string;

    @ApiProperty({ 
        description: 'User\'s role',
        enum: Role
    })
    roles: Role;
}
