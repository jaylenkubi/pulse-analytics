/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { WebsiteFeatureDtoConfiguration } from './websiteFeatureDtoConfiguration';

export interface WebsiteFeatureDto {
  /** UUID of the website to enable the feature for */
  websiteId: string;
  /** Name of the feature to enable */
  featureId: string;
  /** Whether the feature is enabled for this website */
  isEnabled: boolean;
  /** Website-specific configuration for the feature */
  configuration?: WebsiteFeatureDtoConfiguration;
}
