/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */

/**
 * Access level for this feature permission set
 */
export type AccessLevelFeatureAccessLevel =
  (typeof AccessLevelFeatureAccessLevel)[keyof typeof AccessLevelFeatureAccessLevel];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AccessLevelFeatureAccessLevel = {
  owner: 'owner',
  admin: 'admin',
  analyst: 'analyst',
  viewer: 'viewer',
} as const;
