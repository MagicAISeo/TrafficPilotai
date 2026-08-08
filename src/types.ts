export type CampaignType =
  | 'website_qa'
  | 'load_testing'
  | 'synthetic_traffic'
  | 'referral_tracking'
  | 'utm_campaign'
  | 'performance_monitoring';

export type CampaignStatus = 'draft' | 'running' | 'paused' | 'completed' | 'stopped' | 'failed';

export type TrafficSourceType = 'organic' | 'simulated' | 'referral' | 'paid' | 'direct';

export interface DeviceProfile {
  desktopPercent: number;
  mobilePercent: number;
  tabletPercent: number;
}

export interface BrowserProfile {
  chromePercent: number;
  firefoxPercent: number;
  safariPercent: number;
  edgePercent: number;
}

export interface SessionBehavior {
  landingPage: string;
  internalPages: string[];
  pageDepth: number; // 1 to 5 pages
  minWaitTimeSeconds: number;
  maxWaitTimeSeconds: number;
  exitPage: string;
}

export interface UTMParameters {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term?: string;
  utm_content?: string;
}

export interface Campaign {
  id: string;
  name: string;
  websiteUrl: string;
  type: CampaignType;
  status: CampaignStatus;
  totalSessionsTarget: number;
  sessionsCompleted: number;
  concurrencyLimit: number;
  durationMinutes: number;
  targetPages: string[];
  geoLocations: string[]; // e.g. ['US', 'DE', 'JP', 'GB', 'CA']
  deviceProfile: DeviceProfile;
  browserProfile: BrowserProfile;
  sessionBehavior: SessionBehavior;
  utmParams: UTMParameters;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  avgResponseTimeMs: number;
  errorRatePercent: number;
  bounceRatePercent: number;
  avgSessionDurationSec: number;
  notes?: string;
  isSimulated: boolean;
}

export interface WebsiteMonitor {
  id: string;
  name: string;
  url: string;
  checkIntervalMinutes: number;
  status: 'up' | 'down' | 'degraded' | 'pending';
  httpStatus: number;
  responseTimeMs: number;
  uptimePercent24h: number;
  sslStatus: 'valid' | 'expiring_soon' | 'invalid' | 'unknown';
  sslExpiresDays?: number;
  dnsResolvedIp?: string;
  lastCheckedAt: string;
  history: { timestamp: string; responseTimeMs: number; status: 'up' | 'down' | 'degraded' }[];
}

export interface ReferralLink {
  id: string;
  code: string; // e.g. /r/summer-sale
  targetUrl: string;
  name: string;
  clicksCount: number;
  uniqueSessionsCount: number;
  utmParams: UTMParameters;
  createdAt: string;
  lastClickedAt?: string;
}

export interface AnalyticsMetric {
  timestamp: string;
  sessions: number;
  organicSessions: number;
  simulatedSessions: number;
  referralSessions: number;
  paidSessions: number;
  directSessions: number;
  avgDurationSec: number;
  bounceRatePercent: number;
  pagesPerSession: number;
  errorCount: number;
}

export interface GeoDataPoint {
  countryCode: string;
  countryName: string;
  sessions: number;
  percentage: number;
  isSimulated: boolean;
}

export interface DeviceDataPoint {
  device: 'Desktop' | 'Mobile' | 'Tablet';
  sessions: number;
  percentage: number;
}

export interface BrowserDataPoint {
  browser: 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Other';
  sessions: number;
  percentage: number;
}

export interface LiveLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'TEST' | 'PAGE' | 'PERF' | 'WARN' | 'ERROR';
  campaignId?: string;
  campaignName?: string;
  message: string;
  details?: Record<string, unknown>;
}

export type UserRole = 'user' | 'admin';

export interface GoogleIntegrationConfig {
  ga4Connected: boolean;
  gscConnected: boolean;
  ga4PropertyId?: string;
  gscSiteUrl?: string;
  lastSyncedAt?: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'pro' | 'business';
  name: string;
  monthlySessionsLimit: number;
  maxActiveCampaigns: number;
  maxMonitors: number;
  apiAccess: boolean;
}

export interface APIKey {
  id: string;
  name: string;
  keyString: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;

  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'business';
  apiKey: string;
  createdAt: string;
  monthlySessionsUsed: number;
  monthlySessionsLimit: number;
  connectedIntegrations: {
    ga4: boolean;
    ga4PropertyId?: string;
    gsc: boolean;
    gscSiteUrl?: string;
  };
}

export interface GA4Property {
  propertyId: string;
  displayName: string;
  accountName: string;
}

export interface GA4ReportData {
  propertyId: string;
  dateRange: string;
  totalUsers: number;
  sessions: number;
  engagementRate: number;
  avgEngagementTime: string;
  sources: { source: string; sessions: number }[];
  topPages: { path: string; views: number }[];
  isRealData: boolean;
  sourceLabel: string;
}

export interface GSCReportData {
  siteUrl: string;
  dateRange: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  topQueries: { query: string; clicks: number; impressions: number; position: number }[];
  topPages: { page: string; clicks: number; impressions: number }[];
  isRealData: boolean;
  sourceLabel: string;
}

export interface SystemHealth {
  status: 'operational' | 'degraded' | 'maintenance';
  uptimeSeconds: number;
  activeSimulationWorkers: number;
  requestsProcessed24h: number;
  avgLatencyMs: number;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  rateLimitEvents24h: number;
}

export interface AIRecommendation {
  title: string;
  category: 'Performance' | 'SEO' | 'UX' | 'Traffic Quality' | 'Campaign Strategy';
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  actionableSteps: string[];
}
