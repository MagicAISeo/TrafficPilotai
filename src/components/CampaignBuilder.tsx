import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Cpu,
  Globe,
  Gauge,
  HelpCircle,
  Layers,
  Play,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { Campaign, CampaignType, DeviceProfile, BrowserProfile, SessionBehavior, UTMParameters } from '../types';

interface CampaignBuilderProps {
  onSave: (campaignData: Partial<Campaign>, startNow: boolean) => void;
  onCancel: () => void;
}

export const CampaignBuilder: React.FC<CampaignBuilderProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('New E-Commerce QA Audit Campaign');
  const [websiteUrl, setWebsiteUrl] = useState('https://example-shop.com');
  const [type, setType] = useState<CampaignType>('website_qa');
  const [totalSessionsTarget, setTotalSessionsTarget] = useState(2500);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [concurrencyLimit, setConcurrencyLimit] = useState(15);
  const [targetPages, setTargetPages] = useState<string[]>([
    'https://example-shop.com/',
    'https://example-shop.com/products/headphones',
    'https://example-shop.com/cart',
  ]);
  const [geoLocations, setGeoLocations] = useState<string[]>(['US', 'DE', 'GB', 'CA']);
  const [deviceProfile, setDeviceProfile] = useState<DeviceProfile>({
    desktopPercent: 60,
    mobilePercent: 35,
    tabletPercent: 5,
  });
  const [browserProfile, setBrowserProfile] = useState<BrowserProfile>({
    chromePercent: 65,
    firefoxPercent: 15,
    safariPercent: 15,
    edgePercent: 5,
  });
  const [sessionBehavior, setSessionBehavior] = useState<SessionBehavior>({
    landingPage: 'https://example-shop.com/',
    internalPages: ['https://example-shop.com/products/headphones', 'https://example-shop.com/cart'],
    pageDepth: 3,
    minWaitTimeSeconds: 4,
    maxWaitTimeSeconds: 12,
    exitPage: 'https://example-shop.com/cart',
  });
  const [utmParams, setUtmParams] = useState<UTMParameters>({
    utm_source: 'trafficpilot_ai',
    utm_medium: 'qa_simulator',
    utm_campaign: 'checkout_test_v2',
    utm_term: 'wireless_audio',
    utm_content: 'banner_cta',
  });
  const [notes, setNotes] = useState('QA automated session simulation for e-commerce store checkout page.');

  const campaignTypesList: { id: CampaignType; title: string; desc: string; icon: any }[] = [
    { id: 'website_qa', title: 'Website QA Testing', desc: 'Simulate user journeys & page depth for QA verification.', icon: ShieldCheck },
    { id: 'load_testing', title: 'Load & Performance Testing', desc: 'Stress test connection pools under safe bounded rate limits.', icon: Gauge },
    { id: 'synthetic_traffic', title: 'Synthetic Traffic Generation', desc: 'Synthetic session simulation explicitly labeled for audit.', icon: Cpu },
    { id: 'referral_tracking', title: 'Referral Campaign Tracking', desc: 'Track inbound referral links via /r/ short code links.', icon: Globe },
    { id: 'utm_campaign', title: 'UTM Campaign Management', desc: 'Monitor and attribute clean UTM parameter sessions.', icon: Layers },
    { id: 'performance_monitoring', title: 'Performance Monitoring', desc: 'Continuous HTTP response time & SSL validation.', icon: Sparkles },
  ];

  const handleNext = () => {
    if (step < 12) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (startNow: boolean) => {
    const payload: Partial<Campaign> = {
      name,
      websiteUrl,
      type,
      totalSessionsTarget,
      durationMinutes,
      concurrencyLimit,
      targetPages,
      geoLocations,
      deviceProfile,
      browserProfile,
      sessionBehavior,
      utmParams,
      notes,
      isSimulated: type !== 'referral_tracking' && type !== 'utm_campaign',
    };
    onSave(payload, startNow);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            id="back-to-campaigns-btn"
            onClick={onCancel}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              12-Step Campaign Builder Wizard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Step {step} of 12 — Configured with ethical compliance guardrails.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 12) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {Math.round((step / 12) * 100)}%
          </span>
        </div>
      </div>

      {/* Main Wizard Form Body */}
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[420px] flex flex-col justify-between">
        <div>
          {/* STEP 1: Name & URL */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 1: Campaign Name & Target Website URL
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Specify the primary target URL to monitor or run synthetic QA testing on.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Campaign Name
                </label>
                <input
                  id="campaign-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Website URL
                </label>
                <input
                  id="campaign-url-input"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Campaign Type */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 2: Select Campaign Objective
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {campaignTypesList.map((item) => {
                  const Icon = item.icon;
                  const isSelected = type === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setType(item.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Volume */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 3: Target Session Volume
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Define total target sessions to execute for this campaign cycle.
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Total Target Sessions: {totalSessionsTarget.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="500"
                  value={totalSessionsTarget}
                  onChange={(e) => setTotalSessionsTarget(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Duration */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 4: Campaign Duration (Minutes)
              </h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Duration: {durationMinutes} Minutes ({Math.round(durationMinutes / 60)} Hours)
                </label>
                <input
                  type="range"
                  min="15"
                  max="1440"
                  step="15"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Concurrency */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 5: Concurrency & Rate Limits
              </h2>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 mb-4">
                <strong>Safety Notice:</strong> Concurrency specifies max parallel active HTTP connections. Respect server load limits.
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Max Parallel Connections: {concurrencyLimit}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={concurrencyLimit}
                  onChange={(e) => setConcurrencyLimit(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 6: Target Pages */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 6: Target URLs & Navigation Paths
              </h2>
              <div className="space-y-2">
                {targetPages.map((page, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={page}
                    onChange={(e) => {
                      const updated = [...targetPages];
                      updated[idx] = e.target.value;
                      setTargetPages(updated);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
                  />
                ))}
              </div>
              <button
                onClick={() => setTargetPages([...targetPages, websiteUrl])}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                + Add Another Page Path
              </button>
            </div>
          )}

          {/* STEP 7: Geographic Test Locations */}
          {step === 7 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 7: Geographic Locations
              </h2>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {['US', 'DE', 'GB', 'CA', 'JP', 'AU', 'IN', 'BR', 'FR'].map((code) => {
                  const checked = geoLocations.includes(code);
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        if (checked) {
                          setGeoLocations(geoLocations.filter((g) => g !== code));
                        } else {
                          setGeoLocations([...geoLocations, code]);
                        }
                      }}
                      className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        checked
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: Device Profile */}
          {step === 8 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 8: Device Breakdown
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Desktop ({deviceProfile.desktopPercent}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={deviceProfile.desktopPercent}
                    onChange={(e) =>
                      setDeviceProfile({ ...deviceProfile, desktopPercent: Number(e.target.value) })
                    }
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Mobile ({deviceProfile.mobilePercent}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={deviceProfile.mobilePercent}
                    onChange={(e) =>
                      setDeviceProfile({ ...deviceProfile, mobilePercent: Number(e.target.value) })
                    }
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Browser Profile */}
          {step === 9 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 9: Browser User-Agent Mix
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  Chrome Profile: {browserProfile.chromePercent}%
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  Firefox Profile: {browserProfile.firefoxPercent}%
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  Safari Profile: {browserProfile.safariPercent}%
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  Edge Profile: {browserProfile.edgePercent}%
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: Session Behavior */}
          {step === 10 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 10: Session Behavior & Page Depth
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">Page Depth (1 to 5 Pages)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={sessionBehavior.pageDepth}
                    onChange={(e) =>
                      setSessionBehavior({ ...sessionBehavior, pageDepth: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Min Wait Time (Seconds)</label>
                  <input
                    type="number"
                    value={sessionBehavior.minWaitTimeSeconds}
                    onChange={(e) =>
                      setSessionBehavior({ ...sessionBehavior, minWaitTimeSeconds: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 11: UTM Parameters */}
          {step === 11 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 11: UTM Tracking Parameters
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">utm_source</label>
                  <input
                    type="text"
                    value={utmParams.utm_source}
                    onChange={(e) => setUtmParams({ ...utmParams, utm_source: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">utm_medium</label>
                  <input
                    type="text"
                    value={utmParams.utm_medium}
                    onChange={(e) => setUtmParams({ ...utmParams, utm_medium: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">utm_campaign</label>
                  <input
                    type="text"
                    value={utmParams.utm_campaign}
                    onChange={(e) => setUtmParams({ ...utmParams, utm_campaign: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">utm_term</label>
                  <input
                    type="text"
                    value={utmParams.utm_term || ''}
                    onChange={(e) => setUtmParams({ ...utmParams, utm_term: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 12: Review and Start */}
          {step === 12 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 12: Review & Finalize Campaign
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Name:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Target URL:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{websiteUrl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Objective:</span>
                  <span className="capitalize font-semibold text-slate-900 dark:text-white">{type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Sessions & Concurrency:</span>
                  <span>{totalSessionsTarget.toLocaleString()} Sessions @ Max {concurrencyLimit} Parallel</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">UTM String:</span>
                  <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                    ?utm_source={utmParams.utm_source}&utm_medium={utmParams.utm_medium}&utm_campaign={utmParams.utm_campaign}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Controls Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>

          {step < 12 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md cursor-pointer"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSubmit(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save as Draft
              </button>
              <button
                onClick={() => handleSubmit(true)}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg cursor-pointer"
              >
                <Play className="w-4 h-4" /> Launch Campaign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
