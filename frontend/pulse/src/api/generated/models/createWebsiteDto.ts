/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { WebsiteSettings } from './websiteSettings';

export interface CreateWebsiteDto {
  /** Name of the website */
  name: string;
  /** List of domains associated with this website */
  domains: string[];
  /** Website settings */
  settings?: WebsiteSettings;
}
