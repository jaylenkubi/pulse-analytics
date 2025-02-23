import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@modules/auth/enums/roles.enum';

export class UpdateUserDto {
    @ApiProperty({ description: 'User\'s first name', required: false })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({ description: 'User\'s last name', required: false })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({ description: 'User\'s email address', required: false })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'User\'s password', required: false })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({ 
        description: 'User\'s role',
        enum: Role,
        required: false
    })
    @IsEnum(Role)
    @IsOptional()
    roles?: Role;
}
