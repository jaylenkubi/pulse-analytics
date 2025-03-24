export enum EventName {
  PAGE_VIEW = 'page_view',
  USER_ACTION = 'user_action',
  SYSTEM_EVENT = 'system_event'
}

export type DeviceType = 'desktop' | 'mobile' | 'tablet';
export type PageSection = 'dashboard' | 'settings' | 'analytics' | 'auth';
export type Theme = 'dark' | 'light';

export interface UserPreferences {
  theme: Theme;
  timezone: string;
  notificationsEnabled: boolean;
}

export interface User {
  id: string;
  anonymousId: string;
  firstVisit: boolean;
  preferences: UserPreferences;
}

export interface Device {
  type: DeviceType;
  browser: string;
  os: string;
  screenResolution: string;
}

export interface Geo {
  country: string;
  region: string;
  city: string;
}

export interface Context {
  ip: string;
  userAgent: string;
  locale: string;
  device: Device;
  geo: Geo;
}

export interface Traffic {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

export interface Page {
  url: string;
  path: string;
  referrer: string;
  title: string;
  section: PageSection;
}

export interface Metrics {
  engagementTimeMs: number;
  pagesViewed: number;
  bounced: boolean;
  converted: boolean;
  scrollDepth: number;
  loadTimeMs: number;
  interactions: number;
  errors: number;
}

export interface PulseAnalytics {
  dashboardType: string;
  chartInteractions: number;
  filterUsage: Record<string, number>;
  dataExports: number;
  customReports: number;
}

export interface EventInterface {
  eventName: EventName;
  messageId: string;
  timestamp: string;
  user: User;
  context: Context;
  traffic: Traffic;
  page: Page;
  metrics: Metrics;
  pulseAnalytics: PulseAnalytics;
}
