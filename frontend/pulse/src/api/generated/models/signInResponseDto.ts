/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { UserResponseDto } from './userResponseDto';

export interface SignInResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}
