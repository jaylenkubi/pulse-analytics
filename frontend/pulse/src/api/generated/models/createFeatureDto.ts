/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import type { CreateFeatureDtoCategory } from './createFeatureDtoCategory';

export interface CreateFeatureDto {
  /** Unique name identifier for the feature */
  name: string;
  /** Description of what the feature does */
  description: string;
  /** Category the feature belongs to */
  category: CreateFeatureDtoCategory;
  /** Whether the feature is available to all websites by default */
  isGloballyAvailable?: boolean;
}
