import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Key,
  Copy,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SubscriptionPlan, APIKey } from '../types';

interface SubscriptionViewProps {
  currentPlan: SubscriptionPlan;
  apiKeys: APIKey[];
  onUpgradePlan: (plan: SubscriptionPlan) => void;
  onCreateApiKey: (name: string) => void;
  onDeleteApiKey: (id: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warn' | 'error') => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  currentPlan,
  apiKeys,
  onUpgradePlan,
  onCreateApiKey,
  onDeleteApiKey,
  onShowToast,
}) => {
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyName) {
      onCreateApiKey(newKeyName);
      setNewKeyName('');
      onShowToast('New API Key generated!', 'success');
    }
  };

  const handleCopyKey = (keyString: string, id: string) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKeyId(id);
    onShowToast('API Key copied to clipboard!', 'info');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" /> Subscription Tier & API Key Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your SaaS plan limits, monthly session quotas, and developer REST API authentication keys.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
          ACTIVE PLAN: {currentPlan.name}
        </span>
      </div>

      {/* Plans Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* FREE */}
        <div className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col justify-between ${
          currentPlan.id === 'free' ? 'border-2 border-blue-600 shadow-lg' : 'border-slate-200 dark:border-slate-800'
        }`}>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Free Tier</h3>
              {currentPlan.id === 'free' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">Current</span>
              )}
            </div>
            <div className="my-4">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-400 text-xs"> / month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 5,000 Sessions / mo</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 Active Campaigns</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1 Website Monitor</li>
            </ul>
          </div>
          {currentPlan.id !== 'free' && (
            <button
              onClick={() => onUpgradePlan({ id: 'free', name: 'Free', monthlySessionsLimit: 5000, maxActiveCampaigns: 3, maxMonitors: 1, apiAccess: false })}
              className="mt-6 w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs cursor-pointer"
            >
              Downgrade
            </button>
          )}
        </div>

        {/* PRO */}
        <div className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col justify-between ${
          currentPlan.id === 'pro' ? 'border-2 border-blue-600 shadow-xl' : 'border-slate-200 dark:border-slate-800'
        }`}>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pro Tier</h3>
              {currentPlan.id === 'pro' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">Current</span>
              )}
            </div>
            <div className="my-4">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$49</span>
              <span className="text-slate-400 text-xs"> / month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 100,000 Sessions / mo</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited Campaigns</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 10 Website Monitors</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> GA4 & Search Console API</li>
            </ul>
          </div>
          {currentPlan.id !== 'pro' && (
            <button
              onClick={() => onUpgradePlan({ id: 'pro', name: 'Pro Tier', monthlySessionsLimit: 100000, maxActiveCampaigns: 999, maxMonitors: 10, apiAccess: true })}
              className="mt-6 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-md shadow-blue-600/30"
            >
              Switch to Pro
            </button>
          )}
        </div>

        {/* BUSINESS */}
        <div className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col justify-between ${
          currentPlan.id === 'business' ? 'border-2 border-blue-600 shadow-xl' : 'border-slate-200 dark:border-slate-800'
        }`}>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Business Tier</h3>
              {currentPlan.id === 'business' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">Current</span>
              )}
            </div>
            <div className="my-4">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$149</span>
              <span className="text-slate-400 text-xs"> / month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1,000,000 Sessions / mo</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Dedicated Load Testing Concurrency</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Full REST API Access</li>
            </ul>
          </div>
          {currentPlan.id !== 'business' && (
            <button
              onClick={() => onUpgradePlan({ id: 'business', name: 'Business Tier', monthlySessionsLimit: 1000000, maxActiveCampaigns: 9999, maxMonitors: 100, apiAccess: true })}
              className="mt-6 w-full py-2 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer hover:bg-slate-700"
            >
              Switch to Business
            </button>
          )}
        </div>
      </div>

      {/* Developer API Keys Management */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-500" /> Developer REST API Keys
        </h2>

        <form onSubmit={handleCreateKey} className="flex gap-3 text-xs max-w-lg">
          <input
            type="text"
            required
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key Description (e.g. Production CI/CD Worker)"
            className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold cursor-pointer shrink-0 shadow-sm"
          >
            Generate Key
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3">Key Label</th>
                <th className="pb-3">Secret API Key</th>
                <th className="pb-3 text-right">Created Date</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {apiKeys.map((k) => (
                <tr key={k.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{k.name}</td>
                  <td className="py-3 font-mono text-slate-500">{k.keyString}</td>
                  <td className="py-3 text-right text-slate-400">{k.createdAt}</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleCopyKey(k.keyString, k.id)}
                        className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                      >
                        {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onDeleteApiKey(k.id)}
                        className="p-1.5 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supabase Database Connection Panel */}
      <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Supabase Database Connected
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white uppercase animate-pulse">
                  Connected & Live
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Persistent database storage is actively connected to your Supabase project account.
              </p>
            </div>
          </div>
          <a
            href="https://supabase.com/dashboard/project/skvgazailxpzbrsfzqqz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            Open Supabase Dashboard
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Project ID</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              skvgazailxpzbrsfzqqz
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Supabase Host URL</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 text-xs truncate block">
              https://skvgazailxpzbrsfzqqz.supabase.co
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Publishable API Key</span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-600 dark:text-slate-300 text-xs truncate">
                sb_publishable_R-Ia...
              </span>
              <button
                onClick={() => handleCopyKey('sb_publishable_R-IaEV-C4FgDz3y-fna9xA_NxHM7KBy', 'supa-key')}
                className="p-1 rounded text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
