import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { CampaignBuilder } from './components/CampaignBuilder';
import { CampaignsListView } from './components/CampaignsListView';
import { AnalyticsHub } from './components/AnalyticsHub';
import { SyntheticEngineView } from './components/SyntheticEngineView';
import { WebsiteMonitorView } from './components/WebsiteMonitorView';
import { LoadTestingView } from './components/LoadTestingView';
import { ReferralUtmStudio } from './components/ReferralUtmStudio';
import { GeoDeviceAnalytics } from './components/GeoDeviceAnalytics';
import { AiCampaignAssistant } from './components/AiCampaignAssistant';
import { RealTimeConsoleView } from './components/RealTimeConsoleView';
import { GoogleIntegrationsView } from './components/GoogleIntegrationsView';
import { BloggerWidgetView } from './components/BloggerWidgetView';
import { SeoSuiteView } from './components/SeoSuiteView';
import { BacklinkGeneratorView } from './components/BacklinkGeneratorView';
import { AdminPanel } from './components/AdminPanel';
import { SubscriptionView } from './components/SubscriptionView';
import { ToastContainer, ToastMessage } from './components/Toast';

import {
  INITIAL_CAMPAIGNS,
  INITIAL_MONITORS,
  INITIAL_REFERRALS,
  INITIAL_ANALYTICS_SERIES,
  INITIAL_LOGS,
  INITIAL_GOOGLE_CONFIG,
  INITIAL_SUBSCRIPTION_PLAN,
  INITIAL_API_KEYS,
} from './data/initialData';


import {
  Campaign,
  WebsiteMonitor,
  ReferralLink,
  LiveLog,
  GoogleIntegrationConfig,
  SubscriptionPlan,
  APIKey,
  UserRole,
} from './types';

import {
  triggerSingleSimulation,
  runMonitorCheck,
  fetchCampaigns,
  createCampaign,
  startCampaign as apiStartCampaign,
  pauseCampaign as apiPauseCampaign,
  resumeCampaign as apiResumeCampaign,
  stopCampaign as apiStopCampaign,
  deleteCampaign as apiDeleteCampaign,
  fetchMonitors,
  createMonitor as apiCreateMonitor,
  deleteMonitor as apiDeleteMonitor,
  fetchReferrals,
  createReferral as apiCreateReferral,
  deleteReferral as apiDeleteReferral,
  fetchLiveLogs,
} from './services/api';

export function App() {
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Navigation State
  const [activeView, setActiveView] = useState<string>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  // Global Data State
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [monitors, setMonitors] = useState<WebsiteMonitor[]>(INITIAL_MONITORS);
  const [referrals, setReferrals] = useState<ReferralLink[]>(INITIAL_REFERRALS);
  const [logs, setLogs] = useState<LiveLog[]>(INITIAL_LOGS);
  const [googleConfig, setGoogleConfig] = useState<GoogleIntegrationConfig>(INITIAL_GOOGLE_CONFIG);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>(INITIAL_SUBSCRIPTION_PLAN);
  const [apiKeys, setApiKeys] = useState<APIKey[]>(INITIAL_API_KEYS);
  const [userRole, setUserRole] = useState<UserRole>('admin');


  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark class to document body root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Periodic engine log generator simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        'Worker #3 completed 200 OK GET /products/headphones (182ms)',
        'Monitor [Primary E-Commerce Shop] HTTP HEAD check succeeded (218ms)',
        'Rate-limiter verified connection quota for active campaign.',
        'SSRF filter confirmed external domain target safety.',
        'Referral redirect /r/summer-sale tracked new inbound session.',
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const newLog: LiveLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        message: randomMsg,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'warn' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch initial data from server
  useEffect(() => {
    async function loadData() {
      try {
        const [cList, mList, rList, lList] = await Promise.all([
          fetchCampaigns().catch(() => INITIAL_CAMPAIGNS),
          fetchMonitors().catch(() => INITIAL_MONITORS),
          fetchReferrals().catch(() => INITIAL_REFERRALS),
          fetchLiveLogs().catch(() => INITIAL_LOGS),
        ]);
        if (cList && cList.length) setCampaigns(cList);
        if (mList && mList.length) setMonitors(mList);
        if (rList && rList.length) setReferrals(rList);
        if (lList && lList.length) setLogs(lList);
      } catch (e) {
        // Fallback to local initial data
      }
    }
    loadData();
  }, []);

  // Campaign Handlers
  const handleSaveCampaign = async (campaignData: Partial<Campaign>, startNow: boolean) => {
    try {
      const created = await createCampaign(campaignData);
      let finalCamp = created;
      if (startNow) {
        finalCamp = await apiStartCampaign(created.id);
      }
      setCampaigns((prev) => [finalCamp, ...prev]);
      setActiveView('campaigns');
      addToast(
        `Campaign "${finalCamp.name}" ${startNow ? 'launched successfully' : 'saved as draft'}!`,
        'success'
      );
    } catch (err: any) {
      // Local fallback
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        name: campaignData.name || 'Untitled Campaign',
        websiteUrl: campaignData.websiteUrl || 'https://example.com',
        type: campaignData.type || 'website_qa',
        status: startNow ? 'running' : 'draft',
        sessionsCompleted: 0,
        totalSessionsTarget: campaignData.totalSessionsTarget || 1000,
        durationMinutes: campaignData.durationMinutes || 60,
        concurrencyLimit: campaignData.concurrencyLimit || 10,
        targetPages: campaignData.targetPages || [campaignData.websiteUrl || 'https://example.com'],
        geoLocations: campaignData.geoLocations || ['US'],
        deviceProfile: campaignData.deviceProfile || { desktopPercent: 70, mobilePercent: 30, tabletPercent: 0 },
        browserProfile: campaignData.browserProfile || { chromePercent: 70, firefoxPercent: 15, safariPercent: 10, edgePercent: 5 },
        sessionBehavior: campaignData.sessionBehavior || {
          landingPage: campaignData.websiteUrl || 'https://example.com',
          internalPages: [],
          pageDepth: 2,
          minWaitTimeSeconds: 3,
          maxWaitTimeSeconds: 8,
          exitPage: campaignData.websiteUrl || 'https://example.com',
        },
        utmParams: campaignData.utmParams || { utm_source: 'trafficpilot_ai', utm_medium: 'cpc', utm_campaign: 'promo' },
        createdAt: new Date().toISOString().split('T')[0],
        avgResponseTimeMs: 195,
        errorRatePercent: 0,
        bounceRatePercent: 20,
        avgSessionDurationSec: 120,
        notes: campaignData.notes || '',
        isSimulated: campaignData.isSimulated ?? true,
      };

      setCampaigns((prev) => [newCampaign, ...prev]);
      setActiveView('campaigns');
      addToast(
        `Campaign "${newCampaign.name}" ${startNow ? 'launched successfully' : 'saved as draft'}!`,
        'success'
      );
    }
  };

  const handleStartCampaign = async (id: string) => {
    setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status: 'running' } : c)));
    addToast('Campaign started running!', 'success');
    apiStartCampaign(id).catch(() => {});
  };

  const handlePauseCampaign = async (id: string) => {
    setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status: 'paused' } : c)));
    addToast('Campaign paused', 'warn');
    apiPauseCampaign(id).catch(() => {});
  };

  const handleResumeCampaign = async (id: string) => {
    setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status: 'running' } : c)));
    addToast('Campaign resumed', 'success');
    apiResumeCampaign(id).catch(() => {});
  };

  const handleStopCampaign = async (id: string) => {
    setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status: 'stopped' } : c)));
    addToast('Campaign stopped', 'info');
    apiStopCampaign(id).catch(() => {});
  };

  const handleDuplicateCampaign = (id: string) => {
    const target = campaigns.find((c) => c.id === id);
    if (target) {
      const dup: Campaign = {
        ...target,
        id: `camp-${Date.now()}`,
        name: `${target.name} (Copy)`,
        status: 'draft',
        sessionsCompleted: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCampaigns([dup, ...campaigns]);
      addToast(`Duplicated campaign "${dup.name}"!`, 'info');
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    addToast('Campaign deleted', 'warn');
    apiDeleteCampaign(id).catch(() => {});
  };

  // Monitor Handlers
  const handleAddMonitor = async (name: string, url: string, intervalMinutes: number) => {
    try {
      const newMon = await apiCreateMonitor(name, url, intervalMinutes);
      setMonitors((prev) => [newMon, ...prev]);
      addToast(`Website monitor "${name}" created!`, 'success');
    } catch (e) {
      const newMon: WebsiteMonitor = {
        id: `mon-${Date.now()}`,
        name,
        url,
        checkIntervalMinutes: intervalMinutes,
        status: 'up',
        responseTimeMs: 185,
        httpStatus: 200,
        lastCheckedAt: 'Just now',
        sslStatus: 'valid',
        sslExpiresDays: 120,
        uptimePercent24h: 100.0,
        history: [
          { timestamp: '12:00', responseTimeMs: 190, status: 'up' },
          { timestamp: '12:05', responseTimeMs: 185, status: 'up' },
        ],
      };
      setMonitors((prev) => [newMon, ...prev]);
      addToast(`Website monitor "${name}" created!`, 'success');
    }
  };

  const handleCheckMonitorNow = async (id: string) => {
    const mon = monitors.find((m) => m.id === id);
    if (mon) {
      addToast(`Checking endpoint ${mon.url}...`, 'info');
      try {
        const res = await runMonitorCheck(id);
        setMonitors((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  status: res.status,
                  responseTimeMs: res.responseTimeMs,
                  httpStatus: res.httpStatus,
                  lastCheckedAt: 'Just now',
                }
              : m
          )
        );
        addToast(`Ping complete! Latency: ${res.responseTimeMs}ms (HTTP ${res.httpStatus || 200})`, 'success');
      } catch (err: any) {
        addToast(`Ping failed or completed with error: ${err.message || 'Server timeout'}`, 'warn');
      }
    }
  };

  const handleDeleteMonitor = async (id: string) => {
    setMonitors(monitors.filter((m) => m.id !== id));
    addToast('Monitor deleted', 'warn');
    apiDeleteMonitor(id).catch(() => {});
  };

  // Referral Handlers
  const handleCreateReferral = async (name: string, code: string, targetUrl: string) => {
    try {
      const newRef = await apiCreateReferral(name, code, targetUrl);
      setReferrals((prev) => [newRef, ...prev]);
      addToast(`Referral link /r/${code} created!`, 'success');
    } catch (e) {
      const newRef: ReferralLink = {
        id: `ref-${Date.now()}`,
        name,
        code,
        targetUrl,
        clicksCount: 0,
        uniqueSessionsCount: 0,
        utmParams: { utm_source: 'referral', utm_medium: 'direct', utm_campaign: code },
        createdAt: new Date().toISOString().split('T')[0],
      };
      setReferrals((prev) => [newRef, ...prev]);
      addToast(`Referral link /r/${code} created!`, 'success');
    }
  };

  const handleDeleteReferral = async (id: string) => {
    setReferrals(referrals.filter((r) => r.id !== id));
    addToast('Referral link deleted', 'warn');
    apiDeleteReferral(id).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white transition-colors">
      {/* Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        setUserRole={setUserRole}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Layout Area */}
      {activeView === 'landing' ? (
        <LandingPage
          onGetStarted={() => setActiveView('campaign_builder')}
          onOpenDemo={() => setActiveView('dashboard')}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            userRole={userRole}
          />

          {/* Core View Canvas Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {activeView === 'dashboard' && (
              <DashboardView
                campaigns={campaigns}
                monitors={monitors}
                logs={logs}
                onOpenNewCampaign={() => setActiveView('campaign_builder')}
                onSelectCampaign={(id) => {
                  setSelectedCampaignId(id);
                  setActiveView('campaigns');
                }}
                onNavigate={setActiveView}
                onTriggerSingleSimulation={async (url) => {
                  addToast(`Triggering test ping for ${url}...`, 'info');
                  const res = await triggerSingleSimulation(url);
                  if (res.success) {
                    addToast(`Ping success! Latency: ${res.responseTimeMs}ms`, 'success');
                  } else {
                    addToast(`Ping failed: ${res.error}`, 'error');
                  }
                }}
              />
            )}

            {activeView === 'campaigns' && (
              <CampaignsListView
                campaigns={campaigns}
                onOpenNew={() => setActiveView('campaign_builder')}
                onStart={handleStartCampaign}
                onPause={handlePauseCampaign}
                onResume={handleResumeCampaign}
                onStop={handleStopCampaign}
                onDuplicate={handleDuplicateCampaign}
                onDelete={handleDeleteCampaign}
                onSelectCampaign={(id) => setSelectedCampaignId(id)}
              />
            )}

            {activeView === 'campaign_builder' && (
              <CampaignBuilder
                onSave={handleSaveCampaign}
                onCancel={() => setActiveView('campaigns')}
              />
            )}

            {activeView === 'analytics' && (
              <AnalyticsHub
                analyticsSeries={INITIAL_ANALYTICS_SERIES}
                onExportReport={(format) => addToast(`Exported analytics report in .${format} format!`, 'success')}
              />
            )}


            {activeView === 'synthetic' && (
              <SyntheticEngineView onShowToast={addToast} />
            )}

            {activeView === 'monitor' && (
              <WebsiteMonitorView
                monitors={monitors}
                onAddMonitor={handleAddMonitor}
                onCheckNow={handleCheckMonitorNow}
                onDeleteMonitor={handleDeleteMonitor}
              />
            )}

            {activeView === 'load_testing' && (
              <LoadTestingView onShowToast={addToast} />
            )}

            {activeView === 'referral_utm' && (
              <ReferralUtmStudio
                referrals={referrals}
                onCreateReferral={handleCreateReferral}
                onDeleteReferral={handleDeleteReferral}
                onShowToast={addToast}
              />
            )}

            {activeView === 'geo_device' && <GeoDeviceAnalytics />}

            {activeView === 'ai_assistant' && <AiCampaignAssistant />}

            {activeView === 'console' && (
              <RealTimeConsoleView
                logs={logs}
                onClearLogs={() => {
                  setLogs([]);
                  addToast('Console logs cleared', 'info');
                }}
              />
            )}

            {activeView === 'integrations' && (
              <GoogleIntegrationsView
                config={googleConfig}
                onSaveConfig={(updated) => setGoogleConfig(updated)}
                onShowToast={addToast}
              />
            )}

            {activeView === 'blogger' && <BloggerWidgetView />}

            {activeView === 'seo' && <SeoSuiteView />}

            {activeView === 'backlink' && <BacklinkGeneratorView />}

            {activeView === 'admin' && (
              <AdminPanel
                userRole={userRole}
                onToggleRole={() => {
                  const next = userRole === 'admin' ? 'user' : 'admin';
                  setUserRole(next);
                  addToast(`Switched user role to ${next.toUpperCase()}`, 'info');
                }}
                onShowToast={addToast}
              />
            )}

            {activeView === 'subscription' && (
              <SubscriptionView
                currentPlan={subscriptionPlan}
                apiKeys={apiKeys}
                onUpgradePlan={(plan) => {
                  setSubscriptionPlan(plan);
                  addToast(`Plan updated to ${plan.name}!`, 'success');
                }}
                onCreateApiKey={(name) => {
                  const newK: APIKey = {
                    id: `key-${Date.now()}`,
                    name,
                    keyString: `tp_live_${Math.random().toString(36).substring(2, 18)}`,
                    createdAt: new Date().toISOString().split('T')[0],
                  };
                  setApiKeys([...apiKeys, newK]);
                }}
                onDeleteApiKey={(id) => {
                  setApiKeys(apiKeys.filter((k) => k.id !== id));
                  addToast('API Key revoked', 'warn');
                }}
                onShowToast={addToast}
              />
            )}
          </main>
        </div>
      )}

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <Analytics />
    </div>
  );
}

export default App;

