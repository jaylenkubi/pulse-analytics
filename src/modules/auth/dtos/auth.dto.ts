import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@shared/dto/user/user-response.dto";
import { IsEmail, IsString, ValidateNested } from "class-validator";

export class LoginDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}

export class RefreshTokenDto {
    @IsString()
    @ApiProperty()
    refreshToken: string;
}

export class RefreshTokenResponseDto {
    @IsString()
    @ApiProperty()
    accessToken: string;
}

export class SignInResponseDto {
    @ValidateNested()
    @ApiProperty()
    user: UserResponseDto;

    @IsString()
    @ApiProperty()
    accessToken: string;

    @IsString()
    @ApiProperty()
    refreshToken: string;
}
