import { User } from '@entities/user.entity';
import { Body, Controller, Headers, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SwaggerRoute } from '@shared/decorators/swagger.decorator';
import { CreateUserDto } from '@shared/dto';
import { Request } from 'express';
import { AuthService, SignInResponse } from './auth.service';
import { LoginDto, RefreshTokenDto, RefreshTokenResponseDto, SignInResponseDto } from './dtos/auth.dto';
import { LogoutResponseDto } from '@shared/dto/auth/logout-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('signup')
	@SwaggerRoute({
		summary: 'Create a new user account',
		operationId: 'signup',
		bodyType: CreateUserDto,
		responseType: User
	})
	async signup(@Body() signUpDto: CreateUserDto): Promise<User> {
		return this.authService.signUp(signUpDto);
	}

	@Post('login')
	@SwaggerRoute({
		summary: 'Login with email and password',
		operationId: 'login',
		bodyType: LoginDto,
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
		bodyType: RefreshTokenDto,
		responseType: RefreshTokenResponseDto,
		description: 'Access token refreshed successfully',
		operationId: 'refresh'
	})
	async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
		const { refreshToken } = refreshTokenDto;
		return this.authService.refreshAccessToken(refreshToken);
	}

	@Post('logout')
	@ApiBearerAuth('JWT')
	@SwaggerRoute({
		summary: 'Logout from the current session',
		responseType: LogoutResponseDto,
		status: 200,
		description: 'Logged out successfully',
		operationId: 'logout'
	})
	async logout(@Headers('authorization') auth: string): Promise<LogoutResponseDto> {
		if (!auth?.startsWith('Bearer ')) {
			throw new Error('Invalid authorization header');
		}
		await this.authService.logout(auth.split(' ')[1]);
		return { message: 'Logged out successfully' };
	}
}
