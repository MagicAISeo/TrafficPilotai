import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Activity,
  CheckCircle2,
  Lock,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { UserRole } from '../types';

interface AdminPanelProps {
  userRole: UserRole;
  onToggleRole: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warn' | 'error') => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ userRole, onToggleRole, onShowToast }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" /> Admin Safety & Anti-Abuse Panel
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global engine rate limits, SSRF protection filters, click-fraud prevention, and system user management.
          </p>
        </div>

        <button
          onClick={onToggleRole}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:bg-slate-200"
        >
          Active Role: <span className="uppercase text-rose-600 font-extrabold">{userRole}</span> (Click to Switch)
        </button>
      </div>

      {/* Security Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
            <span>SSRF Anti-Abuse Guard</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">ACTIVE</div>
          <p className="text-[11px] text-slate-500">Blocks 127.0.0.1, 10.0.0.0/8, 192.168.0.0/16 targets.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
            <span>Engine Concurrency Cap</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">100 Connections</div>
          <p className="text-[11px] text-slate-500">Maximum global HTTP worker pool limit.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
            <span>Ethical Header Injection</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">ENFORCED</div>
          <p className="text-[11px] text-slate-500">All pings include <code>X-TrafficPilot-Simulated: true</code>.</p>
        </div>
      </div>

      {/* Admin Operations Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Platform System Controls</h2>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Purge System Simulation Cache</div>
              <div className="text-slate-400 text-[11px]">Clear transient HTTP worker response caches.</div>
            </div>
            <button
              onClick={() => onShowToast('System simulation cache purged!', 'info')}
              className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Purge Cache
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Emergency Stop Engine</div>
              <div className="text-slate-400 text-[11px]">Instantly pause all running campaigns platform-wide.</div>
            </div>
            <button
              onClick={() => onShowToast('Emergency stop command dispatched to workers.', 'warn')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold cursor-pointer hover:bg-rose-500"
            >
              Pause All Engine Workers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
