/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { EventResponseDtoEventName } from './eventResponseDtoEventName';
import type { EventResponseDtoWebsite } from './eventResponseDtoWebsite';
import type { EventResponseDtoUser } from './eventResponseDtoUser';
import type { EventResponseDtoContext } from './eventResponseDtoContext';
import type { EventResponseDtoTraffic } from './eventResponseDtoTraffic';
import type { EventResponseDtoPage } from './eventResponseDtoPage';
import type { EventResponseDtoMetrics } from './eventResponseDtoMetrics';

export interface EventResponseDto {
  /** Unique identifier */
  id: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
  /** Unique message ID */
  message_id: string;
  /** Event name */
  event_name: EventResponseDtoEventName;
  /** Website information */
  website: EventResponseDtoWebsite;
  /** Website tracking ID */
  tracking_id: string;
  /** User information */
  user: EventResponseDtoUser;
  /** Event context */
  context: EventResponseDtoContext;
  /** Traffic information */
  traffic: EventResponseDtoTraffic;
  /** Page information */
  page: EventResponseDtoPage;
  /** Event metrics */
  metrics: EventResponseDtoMetrics;
}
