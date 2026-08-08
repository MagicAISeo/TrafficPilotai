import React, { useState } from 'react';
import {
  Copy,
  Download,
  Filter,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Rocket,
  RotateCcw,
  Square,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { Campaign, CampaignStatus } from '../types';

interface CampaignsListViewProps {
  campaigns: Campaign[];
  onOpenNew: () => void;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onStop: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onSelectCampaign: (id: string) => void;
}

export const CampaignsListView: React.FC<CampaignsListViewProps> = ({
  campaigns,
  onOpenNew,
  onStart,
  onPause,
  onResume,
  onStop,
  onDuplicate,
  onDelete,
  onSelectCampaign,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = campaigns.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportReportJSON = (campaign: Campaign) => {
    const jsonStr = JSON.stringify(campaign, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign_report_${campaign.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Rocket className="w-6 h-6 text-blue-600" /> Campaign Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Control, monitor, duplicate, or export reports for all active and historical campaigns.
          </p>
        </div>

        <button
          id="campaigns-list-new-btn"
          onClick={onOpenNew}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Filter by campaign name or domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Status:</span>
          {['all', 'running', 'paused', 'draft', 'completed', 'stopped'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg capitalize font-medium cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-bold">
                <th className="p-4">Campaign & Target</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Sessions Completed</th>
                <th className="p-4 text-right">Avg Response</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">
                    <button
                      onClick={() => onSelectCampaign(c.id)}
                      className="text-left hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                    >
                      <div className="text-sm font-bold">{c.name}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{c.websiteUrl}</div>
                    </button>
                  </td>

                  <td className="p-4 capitalize">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300">
                      {c.type.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                        c.status === 'running'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : c.status === 'paused'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          c.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                        }`}
                      />
                      {c.status}
                    </span>
                  </td>

                  <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                    {c.sessionsCompleted.toLocaleString()} / {c.totalSessionsTarget.toLocaleString()}
                  </td>

                  <td className="p-4 text-right font-mono text-slate-600 dark:text-slate-300">
                    {c.avgResponseTimeMs} ms
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {c.status === 'draft' && (
                        <button
                          onClick={() => onStart(c.id)}
                          className="p-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                          title="Start Campaign"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {c.status === 'running' && (
                        <button
                          onClick={() => onPause(c.id)}
                          className="p-1.5 rounded bg-amber-600 text-white hover:bg-amber-500 cursor-pointer"
                          title="Pause Campaign"
                        >
                          <Pause className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {c.status === 'paused' && (
                        <button
                          onClick={() => onResume(c.id)}
                          className="p-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                          title="Resume Campaign"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onDuplicate(c.id)}
                        className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        title="Duplicate Campaign"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => exportReportJSON(c)}
                        className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        title="Export JSON Report"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDelete(c.id)}
                        className="p-1.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-200 cursor-pointer"
                        title="Delete Campaign"
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
    </div>
  );
};
