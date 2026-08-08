import React, { useState } from 'react';
import {
  Copy,
  Check,
  Globe,
  Link2,
  Plus,
  QrCode,
  Share2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { ReferralLink } from '../types';
import { generateUTMUrl } from '../services/api';

interface ReferralUtmStudioProps {
  referrals: ReferralLink[];
  onCreateReferral: (name: string, code: string, targetUrl: string) => void;
  onDeleteReferral: (id: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warn' | 'error') => void;
}

export const ReferralUtmStudio: React.FC<ReferralUtmStudioProps> = ({
  referrals,
  onCreateReferral,
  onDeleteReferral,
  onShowToast,
}) => {
  // UTM Builder State
  const [baseUrl, setBaseUrl] = useState('https://example-saas-app.com/signup');
  const [utmSource, setUtmSource] = useState('techcrunch');
  const [utmMedium, setUtmMedium] = useState('partner_article');
  const [utmCampaign, setUtmCampaign] = useState('q3_launch');
  const [utmTerm, setUtmTerm] = useState('ai_traffic');
  const [utmContent, setUtmContent] = useState('header_banner');

  const [generatedResult, setGeneratedResult] = useState<{ finalUrl: string; qrCodeUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // New Referral State
  const [showRefModal, setShowRefModal] = useState(false);
  const [refName, setRefName] = useState('');
  const [refCode, setRefCode] = useState('');
  const [refTarget, setRefTarget] = useState('');

  const handleGenerateUTM = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await generateUTMUrl({
        url: baseUrl,
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        term: utmTerm,
        content: utmContent,
      });
      setGeneratedResult(res);
      onShowToast('UTM link generated successfully!', 'success');
    } catch (err: any) {
      onShowToast(`UTM generation failed: ${err.message}`, 'error');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateRefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refName && refCode && refTarget) {
      onCreateReferral(refName, refCode, refTarget);
      setRefName('');
      setRefCode('');
      setRefTarget('');
      setShowRefModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Share2 className="w-6 h-6 text-blue-600" /> Referral & UTM Link Studio
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Generate clean UTM tracking links, download QR codes, and manage short referral redirect links (e.g. <code>/r/summer-sale</code>).
        </p>
      </div>

      {/* SECTION 1: Professional UTM Generator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Link2 className="w-5 h-5 text-blue-600" /> Professional UTM Parameter Generator
        </h2>

        <form onSubmit={handleGenerateUTM} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
              Target Website URL
            </label>
            <input
              type="text"
              required
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/landing"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">utm_source *</label>
              <input
                type="text"
                required
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                placeholder="google, newsletter, twitter"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">utm_medium *</label>
              <input
                type="text"
                required
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                placeholder="cpc, banner, email"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">utm_campaign *</label>
              <input
                type="text"
                required
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="summer_promo"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">utm_term (Optional)</label>
              <input
                type="text"
                value={utmTerm}
                onChange={(e) => setUtmTerm(e.target.value)}
                placeholder="keyword"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">utm_content (Optional)</label>
              <input
                type="text"
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="logolink, cta_button"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-md shadow-blue-600/30"
          >
            Generate Tracking URL & QR Code
          </button>
        </form>

        {/* Output Box */}
        {generatedResult && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-500 mb-1">Generated Final Tracking URL:</div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedResult.finalUrl}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-mono"
                />
                <button
                  onClick={() => handleCopy(generatedResult.finalUrl)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-1.5 cursor-pointer text-xs shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <img
                src={generatedResult.qrCodeUrl}
                alt="Campaign QR Code"
                className="w-24 h-24 rounded-xl border border-slate-200 dark:border-slate-700 p-1 bg-white"
              />
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <QrCode className="w-4 h-4 text-blue-500" /> Dynamic QR Code Ready
                </div>
                <p>Scan with any camera device to test live referral attribution.</p>
                <a
                  href={generatedResult.qrCodeUrl}
                  download="campaign_qr_code.png"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold block"
                >
                  Download High-Res QR Image →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Referral Short Link Manager */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" /> Short Referral Redirect Links
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Track clicks and unique sessions via short URLs like <code>/r/campaign-name</code>.
            </p>
          </div>

          <button
            onClick={() => setShowRefModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Referral Link
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold">
                <th className="pb-3">Short Referral Link</th>
                <th className="pb-3">Target Destination URL</th>
                <th className="pb-3 text-right">Total Clicks</th>
                <th className="pb-3 text-right">Unique Sessions</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {referrals.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-indigo-600 dark:text-indigo-400">
                    <a
                      href={`/r/${r.code}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      /r/{r.code} <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </td>

                  <td className="py-3 font-mono text-slate-600 dark:text-slate-300 truncate max-w-xs">
                    {r.targetUrl}
                  </td>

                  <td className="py-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                    {r.clicksCount.toLocaleString()}
                  </td>

                  <td className="py-3 text-right font-mono text-slate-600 dark:text-slate-300">
                    {r.uniqueSessionsCount.toLocaleString()}
                  </td>

                  <td className="py-3 text-center">
                    <button
                      onClick={() => onDeleteReferral(r.id)}
                      className="p-1.5 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 cursor-pointer"
                      title="Delete Link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Referral Link Modal */}
      {showRefModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Create Short Referral Link</h2>

            <form onSubmit={handleCreateRefSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Campaign / Partner Name
                </label>
                <input
                  type="text"
                  required
                  value={refName}
                  onChange={(e) => setRefName(e.target.value)}
                  placeholder="TechCrunch Partner Link"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Slug Code (e.g. /r/summer-sale)
                </label>
                <input
                  type="text"
                  required
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value)}
                  placeholder="summer-sale"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Target Destination URL
                </label>
                <input
                  type="url"
                  required
                  value={refTarget}
                  onChange={(e) => setRefTarget(e.target.value)}
                  placeholder="https://example.com/promo"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRefModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
                >
                  Save Referral Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
