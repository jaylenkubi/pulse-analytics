import { Injectable, Inject, UnauthorizedException, Logger } from '@nestjs/common';
import { GenericCrudService } from '@shared/services/generic-crud.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@shared/dto';
import { Request } from 'express';
import { User } from '@entities/user.entity';
import { Session } from '@entities/session.entity';

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  sessionId: string;
}

export interface SignInResponse {
  user: {
    id: string;
    email: string;
    roles: string;
  };
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('USERS_SERVICE')
    private readonly userService: GenericCrudService<User>,
    @Inject('SESSIONS_SERVICE')
    private readonly sessionService: GenericCrudService<Session>,
    private readonly jwtService: JwtService,
  ) {}

  private async createSession(user: User, req: Request): Promise<Session> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); //todo: change to 7 days

    const session = await this.sessionService.create({
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      expiresAt, 
      isValid: true
    });

    this.logger.log(`New session created for user ${user.email} from IP ${req.ip}`);
    return session;
  }

  private async generateTokens(user: User, sessionId: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      sessionId
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m', //todo: change to 15m
        secret: process.env.JWT_SECRET,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d', //todo: change to 7d
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const session = await this.validateSession(payload.sessionId);
      if (!session) {
        throw new UnauthorizedException('Invalid session');
      }

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email, roles: payload.roles, sessionId: payload.sessionId },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signIn(email: string, pass: string, req: Request): Promise<SignInResponse> {
    try {
      const [user] = await this.userService.getByQuery({ 
        where: { email }, 
        select: { 
          id: true,
          email: true,
          password: true,
          roles: true
        } 
      });

      if (!user) {
        this.logger.warn(`Failed login attempt for non-existent user: ${email} from IP ${req.ip}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password, id, roles } = user;
      const isMatch = await bcrypt.compare(pass, password);

      if (!isMatch) {
        this.logger.warn(`Failed login attempt for user: ${email} from IP ${req.ip}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const session = await this.createSession(user, req);

      const tokens = await this.generateTokens(user, session.id);

      await this.sessionService.update(session.id, { token: tokens.refreshToken });

      this.logger.log(`Successful login for user: ${email} from IP ${req.ip}`);
      return { ...tokens, user: { id, email, roles } };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(`Login error for IP ${req.ip}: ${error.message}`);
      throw new UnauthorizedException('An error occurred during authentication');
    }
  }

  async signUp(user: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(user.password, 6);
    user.password = password;
    const createdUser = await this.userService.create(user);
    const { password: _, ...result } = createdUser;
    return { ...result, password };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.sessionService.update(sessionId, { 
      isValid: false,
      expiresAt: new Date() // Immediately expire the session
    });
    this.logger.log(`Session ${sessionId} invalidated`);
  }

  async logout(accessToken: string): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET
      });
      
      await this.invalidateSession(payload.sessionId);
      this.logger.log(`User ${payload.email} logged out successfully`);
    } catch (error) {
      this.logger.warn('Logout attempted with invalid token');
    }
  }

  async validateSession(sessionId: string): Promise<boolean> {
    const session = await this.sessionService.getById(sessionId);
    if (!session) return false;

    const isExpired = new Date() > new Date(session.expiresAt);
    return session.isValid && !isExpired;
  }
}
