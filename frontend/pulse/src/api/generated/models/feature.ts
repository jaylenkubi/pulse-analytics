/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { FeatureCategory } from './featureCategory';

export interface Feature {
  /** Unique identifier */
  id: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** Unique name identifier for the feature */
  name: string;
  /** Description of what the feature does */
  description: string;
  /** Category the feature belongs to */
  category: FeatureCategory;
  /** Whether the feature is available to all websites by default */
  isGloballyAvailable: boolean;
}
