import React from 'react';
import {
  Globe2,
  Smartphone,
  Laptop,
  Monitor,
  BarChart2,
  Clock,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COUNTRY_DATA = [
  { country: 'United States (US)', sessions: 12450, latency: 42, flag: '🇺🇸' },
  { country: 'Germany (DE)', sessions: 6200, latency: 118, flag: '🇩🇪' },
  { country: 'United Kingdom (GB)', sessions: 5100, latency: 98, flag: '🇬🇧' },
  { country: 'Canada (CA)', sessions: 3800, latency: 54, flag: '🇨🇦' },
  { country: 'Japan (JP)', sessions: 2900, latency: 185, flag: '🇯🇵' },
  { country: 'Australia (AU)', sessions: 2100, latency: 210, flag: '🇦🇺' },
];

const BROWSER_DATA = [
  { name: 'Chrome 128', value: 62, color: '#3b82f6' },
  { name: 'Safari 17.5', value: 21, color: '#10b981' },
  { name: 'Firefox 129', value: 12, color: '#f59e0b' },
  { name: 'Edge 128', value: 5, color: '#8b5cf6' },
];

export const GeoDeviceAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe2 className="w-6 h-6 text-blue-600" /> Geographic & Device Profile Analytics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor regional traffic distribution, geographic latency variations, and browser User-Agent profiles.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Geo Distribution Table & Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-blue-500" /> Geographic Distribution & Latency
          </h2>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COUNTRY_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} stroke="#64748b" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="sessions" name="Sessions" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-800 pt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold uppercase border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-2">Country Location</th>
                  <th className="pb-2 text-right">Total Sessions</th>
                  <th className="pb-2 text-right">Avg Network Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {COUNTRY_DATA.map((c) => (
                  <tr key={c.country} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.country}</span>
                    </td>
                    <td className="py-2.5 text-right font-mono font-semibold text-slate-900 dark:text-slate-100">
                      {c.sessions.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {c.latency} ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Browser & OS Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-purple-500" /> Browser User-Agent Share
          </h2>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BROWSER_DATA}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {BROWSER_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-800 pt-4">
            {BROWSER_DATA.map((b) => (
              <div key={b.name} className="flex items-center justify-between font-medium">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                  <span>{b.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{b.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
