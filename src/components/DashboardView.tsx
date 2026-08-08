import React, { useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Cpu,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { Campaign, WebsiteMonitor, LiveLog } from '../types';

interface DashboardViewProps {
  campaigns: Campaign[];
  monitors: WebsiteMonitor[];
  logs: LiveLog[];
  onOpenNewCampaign: () => void;
  onSelectCampaign: (id: string) => void;
  onNavigate: (view: string) => void;
  onTriggerSingleSimulation: (url: string) => void;
}

const COLOR_ORGANIC = '#10b981';
const COLOR_SIMULATED = '#f59e0b';
const COLOR_REFERRAL = '#6366f1';

const CHART_DATA = [
  { time: '00:00', organic: 180, simulated: 150, referral: 60 },
  { time: '04:00', organic: 120, simulated: 110, referral: 40 },
  { time: '08:00', organic: 580, simulated: 420, referral: 180 },
  { time: '12:00', organic: 810, simulated: 600, referral: 320 },
  { time: '16:00', organic: 720, simulated: 510, referral: 290 },
  { time: '20:00', organic: 450, simulated: 380, referral: 140 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  campaigns,
  monitors,
  logs,
  onOpenNewCampaign,
  onSelectCampaign,
  onNavigate,
  onTriggerSingleSimulation,
}) => {
  const [dateFilter, setDateFilter] = useState<'today' | 'yesterday' | '7d' | '30d'>('7d');

  const activeCampaigns = campaigns.filter((c) => c.status === 'running');
  const totalSessions = campaigns.reduce((acc, c) => acc + c.sessionsCompleted, 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Range Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Main Performance Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time session monitoring, active synthetic campaigns, and AI traffic analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            {(['today', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateFilter(range as any)}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer capitalize ${
                  dateFilter === range
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'Today'}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenNewCampaign}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Total Sessions</p>
          <div className="flex items-end space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {(totalSessions + 142392).toLocaleString()}
            </h3>
            <span className="text-emerald-500 text-xs font-bold mb-1">+12%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Active Campaigns</p>
          <div className="flex items-end space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeCampaigns.length || 18}</h3>
            <span className="text-slate-400 text-xs font-medium mb-1">3 pausing</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Avg. Duration</p>
          <div className="flex items-end space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">04:32</h3>
            <span className="text-amber-500 text-xs font-bold mb-1">-2%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Error Rate</p>
          <div className="flex items-end space-x-2">
            <h3 className="text-2xl font-bold text-rose-500">0.04%</h3>
            <span className="text-emerald-500 text-xs font-bold mb-1">Stable</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Traffic Chart (8 cols) & AI Assistant (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Traffic Overview</h4>
            <div className="flex space-x-3 text-xs">
              <span className="flex items-center text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> Organic
              </span>
              <span className="flex items-center text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5" /> Simulated
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="organic" name="Organic" stroke={COLOR_ORGANIC} fill={COLOR_ORGANIC} fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="simulated" name="Simulated" stroke={COLOR_SIMULATED} fill={COLOR_SIMULATED} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="col-span-12 lg:col-span-4 bg-indigo-600 text-white p-5 rounded-xl shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-200" /> AI Assistant
            </h4>
            <Info className="w-5 h-5 opacity-60" />
          </div>
          <p className="text-sm opacity-90 leading-relaxed italic my-4">
            "We noticed a 15% drop in conversion for your 'Summer Promo' campaign. AI recommends adjusting the session dwell time to 45s."
          </p>
          <button
            onClick={() => onNavigate('ai_assistant')}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/20 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            View Optimization Report
          </button>
        </div>
      </div>

      {/* Bottom Grid: Active Campaign Management (8 cols) & Live Logs (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between bg-slate-50/50 dark:bg-slate-800/40 items-center">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Active Campaign Management</h4>
            <button
              onClick={() => onNavigate('campaigns')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 uppercase tracking-wider font-bold">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="px-4 py-3">Campaign Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Sessions</th>
                  <th className="px-4 py-3">CTR</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {campaigns.slice(0, 5).map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCampaign(c.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                      {c.name}
                    </td>
                    <td className="px-4 py-3">
                      {c.isSimulated ? (
                        <span className="badge-simulated px-2 py-0.5 rounded text-[10px] font-bold">
                          SIMULATED
                        </span>
                      ) : (
                        <span className="badge-organic px-2 py-0.5 rounded text-[10px] font-bold">
                          ORGANIC
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center text-emerald-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        {c.status === 'running' ? 'Running' : c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-slate-800 dark:text-slate-200">
                      {c.sessionsCompleted.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {c.isSimulated ? 'N/A' : '3.2%'}
                    </td>
                    <td className="px-4 py-3 text-right text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                      Monitor
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Simulation Logs Column */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-xl shadow-lg flex flex-col justify-between border border-slate-800">
          <div>
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h4 className="text-white font-bold text-sm">Live Simulation Logs</h4>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded uppercase font-bold">
                Live
              </span>
            </div>

            <div className="p-4 font-mono text-[11px] text-slate-400 space-y-2 max-h-52 overflow-y-auto leading-tight">
              {logs.slice(0, 5).map((log, i) => (
                <p key={log.id || i}>
                  <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                  <span className="text-indigo-400">[{log.level}]</span>{' '}
                  <span className="text-slate-300">{log.message}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-slate-800 text-right">
            <button
              onClick={() => onNavigate('console')}
              className="text-[11px] text-indigo-400 hover:underline font-mono cursor-pointer"
            >
              Open Full Console →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

