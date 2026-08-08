import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  Globe,
  Lock,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react';
import { WebsiteMonitor } from '../types';

interface WebsiteMonitorViewProps {
  monitors: WebsiteMonitor[];
  onAddMonitor: (name: string, url: string, interval: number) => void;
  onCheckNow: (id: string) => void;
  onDeleteMonitor: (id: string) => void;
}

export const WebsiteMonitorView: React.FC<WebsiteMonitorViewProps> = ({
  monitors,
  onAddMonitor,
  onCheckNow,
  onDeleteMonitor,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [interval, setInterval] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url) {
      onAddMonitor(name, url, interval);
      setName('');
      setUrl('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" /> Website Uptime & SSL Monitor
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            24/7 background HTTP health checks, response latency tracking, SSL certificate alerts, and DNS verification.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Website Monitor
        </button>
      </div>

      {/* Monitor Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitors.map((mon) => (
          <div
            key={mon.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{mon.name}</h3>
                  <a
                    href={mon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-slate-400 hover:text-blue-500 truncate block max-w-xs mt-0.5"
                  >
                    {mon.url}
                  </a>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    mon.status === 'up'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : mon.status === 'degraded'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {mon.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">HTTP Status</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    {mon.httpStatus || 200} OK
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Response Speed</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    {mon.responseTimeMs} ms
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">SSL Certificate</div>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Valid ({mon.sslExpiresDays || 120}d)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">24h Uptime</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    {mon.uptimePercent24h}%
                  </div>
                </div>
              </div>

              {/* Ping history Sparkline */}
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 font-medium">Recent Ping Latency:</div>
                <div className="flex items-end gap-1 h-10 pt-2">
                  {mon.history.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-blue-500/80 rounded-t hover:bg-blue-600 transition-all cursor-pointer relative group"
                      style={{ height: `${Math.min(100, Math.max(20, (h.responseTimeMs / 500) * 100))}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-1 bg-slate-900 text-white text-[10px] rounded shadow whitespace-nowrap z-10">
                        {h.timestamp} — {h.responseTimeMs}ms
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
              <span className="text-[10px] text-slate-400">Interval: Every {mon.checkIntervalMinutes}m</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onCheckNow(mon.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Ping
                </button>
                <button
                  onClick={() => onDeleteMonitor(mon.id)}
                  className="p-1 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Monitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Website Monitor</h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Monitor Friendly Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Primary SaaS Landing Page"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Target Website URL
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Check Interval (Minutes)
                </label>
                <select
                  value={interval}
                  onChange={(e) => setInterval(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold"
                >
                  <option value={1}>Every 1 Minute</option>
                  <option value={5}>Every 5 Minutes</option>
                  <option value={15}>Every 15 Minutes</option>
                  <option value={60}>Every 1 Hour</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer"
                >
                  Start Monitoring
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
