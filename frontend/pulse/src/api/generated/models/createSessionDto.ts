/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */

export interface CreateSessionDto {
  /** ID of the user for this session */
  userId: string;
  /** Session token */
  token?: string;
  /** IP address of the client */
  ipAddress?: string;
  /** User agent of the client */
  userAgent?: string;
  /** Whether the session is valid */
  isValid: boolean;
  /** When the session expires */
  expiresAt: Date;
}
