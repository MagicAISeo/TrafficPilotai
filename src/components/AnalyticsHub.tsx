import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Cpu,
  Download,
  Filter,
  Globe,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { AnalyticsMetric, TrafficSourceType } from '../types';

interface AnalyticsHubProps {
  analyticsSeries: AnalyticsMetric[];
  onExportReport: (format: 'csv' | 'json') => void;
}

export const AnalyticsHub: React.FC<AnalyticsHubProps> = ({ analyticsSeries, onExportReport }) => {
  const [activeTab, setActiveTab] = useState<TrafficSourceType>('simulated');
  const [dateRange, setDateRange] = useState<'today' | 'yesterday' | '7d' | '30d'>('7d');

  const tabLabels: { id: TrafficSourceType; label: string; desc: string; isReal: boolean }[] = [
    { id: 'organic', label: 'ORGANIC (GA4)', desc: 'Official Google Analytics API verified organic sessions.', isReal: true },
    { id: 'simulated', label: 'SIMULATED TRAFFIC', desc: 'Platform generated QA & load test sessions.', isReal: false },
    { id: 'referral', label: 'REFERRAL TRAFFIC', desc: 'Inbound partner links & short URL clicks.', isReal: true },
    { id: 'paid', label: 'PAID ADS', desc: 'Imported advertising campaign metrics.', isReal: true },
    { id: 'direct', label: 'DIRECT TRAFFIC', desc: 'Imported direct session metrics.', isReal: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" /> Analytics Hub & Traffic Classification
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Strictly segregated metrics—never mix simulated test data with real organic Google search traffic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onExportReport('csv')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => onExportReport('json')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-500 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" /> Export JSON
          </button>
        </div>
      </div>

      {/* Traffic Type Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tabLabels.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-600 bg-white dark:bg-slate-900 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    tab.isReal
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                  }`}
                >
                  {tab.isReal ? 'VERIFIED DATA' : 'TEST DATA'}
                </span>
              </div>
              <div className="font-extrabold text-xs text-slate-900 dark:text-white">{tab.label}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">{tab.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Main Analytics Display Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {activeTab} Sessions Timeline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hourly breakdown for selected traffic source.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            {(['today', 'yesterday', '7d', '30d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1 rounded-lg capitalize font-semibold cursor-pointer ${
                  dateRange === r ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey={
                  activeTab === 'organic'
                    ? 'organicSessions'
                    : activeTab === 'simulated'
                    ? 'simulatedSessions'
                    : activeTab === 'referral'
                    ? 'referralSessions'
                    : activeTab === 'paid'
                    ? 'paidSessions'
                    : 'directSessions'
                }
                fill={
                  activeTab === 'organic'
                    ? '#3b82f6'
                    : activeTab === 'simulated'
                    ? '#8b5cf6'
                    : activeTab === 'referral'
                    ? '#10b981'
                    : '#f59e0b'
                }
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="text-xs text-slate-400 font-semibold">Total Category Sessions</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {activeTab === 'simulated' ? '7,200' : activeTab === 'organic' ? '8,420' : '2,890'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="text-xs text-slate-400 font-semibold">Avg Session Duration</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">172 sec</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="text-xs text-slate-400 font-semibold">Pages per Session</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">3.8</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="text-xs text-slate-400 font-semibold">Bounce Rate</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">23.8%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
