import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';
import { triggerSingleSimulation } from '../services/api';

interface SyntheticEngineViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warn' | 'error') => void;
}

export const SyntheticEngineView: React.FC<SyntheticEngineViewProps> = ({ onShowToast }) => {
  const [targetUrl, setTargetUrl] = useState('https://example-shop.com');
  const [selectedBrowser, setSelectedBrowser] = useState<'chrome' | 'firefox' | 'safari' | 'edge'>('chrome');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<any | null>(null);

  const handleRunSingleTest = async () => {
    setIsRunning(true);
    setTestResult(null);
    try {
      const res = await triggerSingleSimulation(targetUrl, selectedBrowser);
      setTestResult(res);
      if (res.success) {
        onShowToast(`Simulated request OK (HTTP ${res.statusCode}, ${res.responseTimeMs}ms)`, 'success');
      } else {
        onShowToast(`Simulation error: ${res.error || 'Failed'}`, 'error');
      }
    } catch (err: any) {
      onShowToast(`Execution error: ${err.message}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-purple-600" /> Synthetic Traffic Simulation Engine
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Safe, ethical synthetic traffic generation for website QA testing, load benchmarking, and HTTP response tracking.
        </p>
      </div>

      {/* Safety Compliance Guardrails Banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
          Strict Ethical Safety & Anti-Abuse Policy
        </div>
        <ul className="grid sm:grid-cols-2 gap-2 text-xs leading-relaxed">
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            Never claims test traffic is organic Google search traffic.
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            Explicitly sets <code>X-TrafficPilot-Simulated</code> headers.
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            Forbidden from CAPTCHA/Bot-Detection bypass or click fraud.
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            Automatically restricts localhost/internal IP targets (SSRF Guard).
          </li>
        </ul>
      </div>

      {/* Controller Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Interactive Single-Session Tester
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Target URL
            </label>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Browser Profile
            </label>
            <select
              value={selectedBrowser}
              onChange={(e) => setSelectedBrowser(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold"
            >
              <option value="chrome">Chrome 128 (Desktop)</option>
              <option value="firefox">Firefox 129 (Desktop)</option>
              <option value="safari">Safari 17.5 (Mobile iOS)</option>
              <option value="edge">Edge 128 (Desktop)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunSingleTest}
          disabled={isRunning}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" /> Executing Simulated Ping...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Trigger Single Simulated Session
            </>
          )}
        </button>

        {/* Test Result Box */}
        {testResult && (
          <div
            className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
              testResult.success
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Status: {testResult.success ? '200 OK (SUCCESS)' : 'FAILED'}</span>
              <span>Latency: {testResult.responseTimeMs} ms</span>
            </div>
            <div>URL: {testResult.url}</div>
            {testResult.statusCode && <div>HTTP Status Code: {testResult.statusCode}</div>}
            {testResult.error && <div className="text-rose-600 font-bold">Error: {testResult.error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
