import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

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
    @IsString()
    @ApiProperty()
    accessToken: string;

    @IsString()
    @ApiProperty()
    refreshToken: string;
}
