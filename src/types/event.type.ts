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
  notifications_enabled: boolean;
}

export interface User {
  id: string;
  anonymous_id: string;
  first_visit: boolean;
  preferences: UserPreferences;
}

export interface Device {
  type: DeviceType;
  browser: string;
  os: string;
  screen_resolution: string;
}

export interface Geo {
  country: string;
  region: string;
  city: string;
}

export interface Context {
  ip: string;
  user_agent: string;
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
  engagement_time_ms: number;
  pages_viewed: number;
  bounced: boolean;
  converted: boolean;
  scroll_depth: number;
  load_time_ms: number;
  interactions: number;
  errors: number;
}

export interface PulseAnalytics {
  dashboard_type: string;
  chart_interactions: number;
  filter_usage: Record<string, number>;
  data_exports: number;
  custom_reports: number;
}

export interface EventInterface {
  event_name: EventName;
  message_id: string;
  timestamp: string;
  user: User;
  context: Context;
  traffic: Traffic;
  page: Page;
  metrics: Metrics;
  pulse_analytics: PulseAnalytics;
}
