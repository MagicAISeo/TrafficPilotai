import {
  Campaign,
  WebsiteMonitor,
  ReferralLink,
  LiveLog,
  User,
  SystemHealth,
  AIRecommendation,
} from '../types';

export async function fetchUserProfile(): Promise<User> {
  const res = await fetch('/api/user/profile');
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
}

export async function rotateApiKey(): Promise<{ apiKey: string }> {
  const res = await fetch('/api/user/key/rotate', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to rotate API key');
  return res.json();
}

export async function fetchSystemHealth(): Promise<SystemHealth & { activeCampaignsCount: number }> {
  const res = await fetch('/api/system/health');
  if (!res.ok) throw new Error('Failed to fetch system health');
  return res.json();
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const res = await fetch('/api/campaigns');
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return res.json();
}

export async function createCampaign(data: Partial<Campaign>): Promise<Campaign> {
  const res = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create campaign');
  }
  return res.json();
}

export async function startCampaign(id: string): Promise<Campaign> {
  const res = await fetch(`/api/campaigns/${id}/start`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to start campaign');
  return res.json();
}

export async function pauseCampaign(id: string): Promise<Campaign> {
  const res = await fetch(`/api/campaigns/${id}/pause`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to pause campaign');
  return res.json();
}

export async function resumeCampaign(id: string): Promise<Campaign> {
  const res = await fetch(`/api/campaigns/${id}/resume`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to resume campaign');
  return res.json();
}

export async function stopCampaign(id: string): Promise<Campaign> {
  const res = await fetch(`/api/campaigns/${id}/stop`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to stop campaign');
  return res.json();
}

export async function duplicateCampaign(id: string): Promise<Campaign> {
  const res = await fetch(`/api/campaigns/${id}/duplicate`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to duplicate campaign');
  return res.json();
}

export async function deleteCampaign(id: string): Promise<void> {
  const res = await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete campaign');
}

export async function fetchMonitors(): Promise<WebsiteMonitor[]> {
  const res = await fetch('/api/monitors');
  if (!res.ok) throw new Error('Failed to fetch monitors');
  return res.json();
}

export async function createMonitor(name: string, url: string, checkIntervalMinutes: number): Promise<WebsiteMonitor> {
  const res = await fetch('/api/monitors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, url, checkIntervalMinutes }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create monitor');
  }
  return res.json();
}

export async function checkMonitorNow(id: string): Promise<WebsiteMonitor> {
  const res = await fetch(`/api/monitors/${id}/check`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to check monitor');
  return res.json();
}

export async function deleteMonitor(id: string): Promise<void> {
  const res = await fetch(`/api/monitors/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete monitor');
}

export async function fetchReferrals(): Promise<ReferralLink[]> {
  const res = await fetch('/api/referrals');
  if (!res.ok) throw new Error('Failed to fetch referrals');
  return res.json();
}

export async function createReferral(name: string, code: string, targetUrl: string, utmParams?: any): Promise<ReferralLink> {
  const res = await fetch('/api/referrals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, code, targetUrl, utmParams }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create referral link');
  }
  return res.json();
}

export async function deleteReferral(id: string): Promise<void> {
  const res = await fetch(`/api/referrals/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete referral link');
}

export async function generateUTMUrl(payload: {
  url: string;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}): Promise<{ finalUrl: string; qrCodeUrl: string }> {
  const res = await fetch('/api/utm/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to generate UTM link');
  }
  return res.json();
}

export async function runMonitorCheck(id: string): Promise<WebsiteMonitor> {
  return checkMonitorNow(id);
}

export async function askAiAdvisor(question: string): Promise<{ answer: string; suggestions?: string[] }> {
  const res = await askAI(question);
  return {
    answer: res.answer,
    suggestions: [
      'How do I setup GA4 property tracking?',
      'What is the best concurrency setting for API stress testing?',
    ],
  };
}

export async function triggerSingleSimulation(targetUrl: string, browser: string = 'chrome'): Promise<any> {
  const res = await fetch('/api/simulation/single', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetUrl, browser }),
  });
  if (!res.ok) throw new Error('Simulation execution failed');
  return res.json();
}


export async function fetchAIRecommendations(): Promise<{ recommendations: AIRecommendation[] }> {
  const res = await fetch('/api/ai/recommendations', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to fetch AI recommendations');
  return res.json();
}

export async function askAI(question: string): Promise<{ answer: string }> {
  const res = await fetch('/api/ai/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error('Failed to process AI question');
  return res.json();
}

export async function fetchLiveLogs(): Promise<LiveLog[]> {
  const res = await fetch('/api/logs');
  if (!res.ok) throw new Error('Failed to fetch live logs');
  return res.json();
}

export async function fetchGA4IntegrationData(): Promise<any> {
  const res = await fetch('/api/integrations/ga4');
  if (!res.ok) throw new Error('Failed to fetch GA4 data');
  return res.json();
}

export async function fetchGSCIntegrationData(): Promise<any> {
  const res = await fetch('/api/integrations/gsc');
  if (!res.ok) throw new Error('Failed to fetch GSC data');
  return res.json();
}
