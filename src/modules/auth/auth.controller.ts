import { User } from '@entities/user.entity';
import { Body, Controller, Headers, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from '@shared/decorators/swagger.decorator';
import { CreateUserDto } from '@shared/dto';
import { Request } from 'express';
import { AuthService, SignInResponse } from './auth.service';
import { LoginDto, RefreshTokenDto, RefreshTokenResponseDto, SignInResponseDto } from './dtos/auth.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('signup')
	@SwaggerRoute({
		summary: 'Create a new user account',
		requestType: CreateUserDto,
		responseType: User
	})
	async signup(@Body() signUpDto: CreateUserDto): Promise<User> {
		return this.authService.signUp(signUpDto);
	}

	@Post('login')
	@SwaggerRoute({
		summary: 'Login with email and password',
		requestType: LoginDto,
		responseType: SignInResponseDto
	})
	async login(
		@Body() { email, password }: LoginDto,
		@Req() req: Request,
	): Promise<SignInResponse> {
		return this.authService.signIn(email, password, req);
	}

	@Post('refresh')
	@SwaggerRoute({
		summary: 'Refresh access token',
		requestType: RefreshTokenDto,
		responseType: RefreshTokenResponseDto
	})
	async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
		const { refreshToken } = refreshTokenDto;
		return this.authService.refreshAccessToken(refreshToken);
	}

	@Post('logout')
	@SwaggerRoute({
		summary: 'Logout from the current session',
	})
	async logout(@Headers('authorization') auth: string) {
		if (!auth?.startsWith('Bearer ')) {
			throw new UnauthorizedException('Invalid token format');
		}
		const token = auth.split(' ')[1];
		await this.authService.logout(token);
		return { message: 'Logged out successfully' };
	}
}
