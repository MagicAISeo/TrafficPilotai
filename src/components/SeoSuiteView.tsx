import React, { useState } from 'react';
import {
  Search,
  Code2,
  FileText,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Download,
} from 'lucide-react';

export const SeoSuiteView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schema' | 'sitemap' | 'robots'>('schema');
  const [siteUrl, setSiteUrl] = useState('https://trafficpilot.ai');
  const [siteName, setSiteName] = useState('TrafficPilot AI');
  const [copied, setCopied] = useState(false);

  const jsonLdCode = `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "${siteName}",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "url": "${siteUrl}"
}`;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/features</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  const robotsTxt = `# TrafficPilot AI Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${siteUrl}/sitemap.xml`;

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> SEO & Schema Markup Suite
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate JSON-LD structured data schema, validate XML sitemaps, and configure production-ready robots.txt rules.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'schema', label: 'JSON-LD Schema Markup', icon: Code2 },
          { id: 'sitemap', label: 'XML Sitemap Generator', icon: FileText },
          { id: 'robots', label: 'Robots.txt Inspector', icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="grid sm:grid-cols-2 gap-4 w-full max-w-lg text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Site Domain URL</label>
              <input
                type="text"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Site / Brand Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold"
              />
            </div>
          </div>

          <button
            onClick={() =>
              handleCopy(
                activeTab === 'schema' ? jsonLdCode : activeTab === 'sitemap' ? sitemapXml : robotsTxt
              )
            }
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy File'}
          </button>
        </div>

        <textarea
          readOnly
          rows={14}
          value={
            activeTab === 'schema' ? jsonLdCode : activeTab === 'sitemap' ? sitemapXml : robotsTxt
          }
          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed"
        />
      </div>
    </div>
  );
};
