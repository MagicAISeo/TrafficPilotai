import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Globe,
  Sparkles,
  ShieldCheck,
  Eye,
} from 'lucide-react';

export const BloggerWidgetView: React.FC = () => {
  const [targetDomain, setTargetDomain] = useState('https://my-blogger-site.blogspot.com');
  const [widgetType, setWidgetType] = useState<'counter' | 'badge' | 'shield'>('counter');
  const [themeColor, setThemeColor] = useState('#2563eb');
  const [copied, setCopied] = useState(false);

  const embedCode = `<div id="tp-traffic-widget" data-domain="${targetDomain}" data-theme="${widgetType}" data-color="${themeColor}"></div>
<script src="https://trafficpilot.ai/cdn/blogger-widget.js" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-6 h-6 text-purple-600" /> Blogger & CMS Traffic Widget Studio
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Generate lightweight, fast HTML/JS embed codes for Blogger, WordPress, or custom websites to display real-time site stats or uptime badges.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Configuration Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Widget Configuration</h2>

          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Target Blog URL</label>
            <input
              type="text"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Widget Style</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'counter', name: 'Traffic Counter' },
                { id: 'badge', name: 'Performance Badge' },
                { id: 'shield', name: 'Uptime Shield' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setWidgetType(style.id as any)}
                  className={`p-2.5 rounded-xl border font-semibold text-[11px] cursor-pointer transition-colors ${
                    widgetType === style.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Accent Theme Color</label>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-full h-10 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-500" /> Live Widget Preview
            </h2>

            <div className="mt-6 p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[160px]">
              {widgetType === 'counter' && (
                <div
                  className="px-6 py-4 rounded-2xl text-white shadow-xl flex items-center gap-4"
                  style={{ backgroundColor: themeColor }}
                >
                  <Globe className="w-6 h-6" />
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-80">TrafficPilot Verified</div>
                    <div className="text-lg font-extrabold font-mono">142,890 Visitors</div>
                  </div>
                </div>
              )}

              {widgetType === 'badge' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white border border-slate-700 text-xs font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified 99.9% Uptime</span>
                </div>
              )}

              {widgetType === 'shield' && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white border-2 border-purple-500 text-xs font-mono space-y-1 text-center">
                  <ShieldCheck className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                  <div className="font-bold">TrafficPilot Monitored</div>
                  <div className="text-[10px] text-slate-400">Response Speed: 184ms</div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Embed HTML Snippet:</span>
              <button
                onClick={handleCopy}
                className="text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <textarea
              readOnly
              rows={3}
              value={embedCode}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-300 text-[11px] font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
