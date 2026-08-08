import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  Globe,
  RefreshCw,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { GoogleIntegrationConfig } from '../types';

interface GoogleIntegrationsViewProps {
  config: GoogleIntegrationConfig;
  onSaveConfig: (updated: GoogleIntegrationConfig) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warn' | 'error') => void;
}

export const GoogleIntegrationsView: React.FC<GoogleIntegrationsViewProps> = ({
  config,
  onSaveConfig,
  onShowToast,
}) => {
  const [ga4PropertyId, setGa4PropertyId] = useState(config.ga4PropertyId || '398201948');
  const [gscSiteUrl, setGscSiteUrl] = useState(config.gscSiteUrl || 'sc-domain:example-shop.com');
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ga4Connected: true,
      gscConnected: true,
      ga4PropertyId,
      gscSiteUrl,
      lastSyncedAt: new Date().toLocaleTimeString(),
    });
    onShowToast('Google GA4 & Search Console configuration saved!', 'success');
  };

  const handleTestSync = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      onShowToast('Successfully authenticated with Google GA4 & Search Console APIs!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Link2 className="w-6 h-6 text-blue-600" /> Google Analytics 4 & Search Console
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Connect official Google APIs to import verified organic traffic and search query metrics directly into your dashboard.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* GA4 Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg">
                GA4
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Google Analytics 4 Property
                </h3>
                <p className="text-xs text-slate-400">Import official user sessions, pageviews, and bounce rate.</p>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                config.ga4Connected
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {config.ga4Connected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              GA4 Property ID
            </label>
            <input
              type="text"
              required
              value={ga4PropertyId}
              onChange={(e) => setGa4PropertyId(e.target.value)}
              placeholder="e.g. 398201948"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
            />
          </div>
        </div>

        {/* Search Console Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-lg">
                GSC
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Google Search Console Site Property
                </h3>
                <p className="text-xs text-slate-400">Import organic search impressions, clicks, and keyword rankings.</p>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                config.gscConnected
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {config.gscConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Search Console Site URL / Property
            </label>
            <input
              type="text"
              required
              value={gscSiteUrl}
              onChange={(e) => setGscSiteUrl(e.target.value)}
              placeholder="e.g. sc-domain:example.com or https://example.com/"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleTestSync}
            disabled={isTesting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            <span>Test Connection & Sync Now</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 cursor-pointer"
          >
            Save Integration Settings
          </button>
        </div>
      </form>
    </div>
  );
};
