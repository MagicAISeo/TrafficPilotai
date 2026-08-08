import React, { useState } from 'react';
import {
  Terminal,
  Trash2,
  Pause,
  Play,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { LiveLog } from '../types';

interface RealTimeConsoleViewProps {
  logs: LiveLog[];
  onClearLogs: () => void;
}

export const RealTimeConsoleView: React.FC<RealTimeConsoleViewProps> = ({ logs, onClearLogs }) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [isPaused, setIsPaused] = useState(false);

  const filteredLogs = logs.filter((l) => filterLevel === 'ALL' || l.level === filterLevel);

  const downloadLogsTXT = () => {
    const textStr = logs.map((l) => `[${l.timestamp}] [${l.level}] ${l.message}`).join('\n');
    const blob = new Blob([textStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trafficpilot_engine_logs.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Real-Time Engine Console
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Live stream of background HTTP workers, website monitors, rate-limiters, and simulation tasks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer border ${
              isPaused
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            {isPaused ? 'Resume Stream' : 'Pause Stream'}
          </button>

          <button
            onClick={downloadLogsTXT}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export TXT
          </button>

          <button
            onClick={onClearLogs}
            className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
        <Filter className="w-4 h-4 text-slate-400 ml-2" />
        <span className="text-slate-500 mr-2">Level Filter:</span>
        {['ALL', 'INFO', 'WARN', 'ERROR', 'TEST'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilterLevel(lvl)}
            className={`px-3 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
              filterLevel === lvl
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Log Console Output Box */}
      <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 font-mono text-xs shadow-2xl min-h-[480px] max-h-[600px] overflow-y-auto space-y-2">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-500 py-12 text-center">No logs matching active filter level.</div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 py-0.5 hover:bg-slate-900/60 rounded px-1">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span
                className={`font-bold shrink-0 ${
                  log.level === 'ERROR'
                    ? 'text-rose-400'
                    : log.level === 'WARN'
                    ? 'text-amber-400'
                    : log.level === 'TEST'
                    ? 'text-purple-400'
                    : 'text-blue-400'
                }`}
              >
                [{log.level.padEnd(5, ' ')}]
              </span>
              <span className="text-slate-300 break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
