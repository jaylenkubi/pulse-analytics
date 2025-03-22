/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { WebsiteSettingsCustomVariables } from './websiteSettingsCustomVariables';

export interface WebsiteSettings {
  /** Tracking options for the website */
  tracking_options?: string[];
  /** Paths to exclude from tracking */
  excluded_paths?: string[];
  /** Custom variables for tracking */
  custom_variables?: WebsiteSettingsCustomVariables;
}
