/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { WebsiteResponseDtoSettings } from './websiteResponseDtoSettings';
import type { WebsiteResponseDtoOwner } from './websiteResponseDtoOwner';

export interface WebsiteResponseDto {
  /** Unique identifier */
  id: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** Name of the website */
  name: string;
  /** List of domains associated with this website */
  domains: string[];
  /** Unique tracking ID for this website */
  trackingId: string;
  /** Website settings */
  settings: WebsiteResponseDtoSettings;
  /** Owner ID of the website */
  owner: WebsiteResponseDtoOwner;
}
