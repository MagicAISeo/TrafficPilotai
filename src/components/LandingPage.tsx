import React from 'react';
import {
  Activity,
  ArrowRight,
  BarChart2,
  Check,
  Cpu,
  Globe,
  Gauge,
  Layers,
  Sparkles,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenDemo }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 border-b border-indigo-800/50 px-4 py-2.5 text-center text-xs text-indigo-100 shadow-sm">
        <span className="font-bold text-white mr-2">Ethical Compliance Notice:</span>
        Simulated test traffic is strictly labeled for QA & load testing. We do not participate in click fraud or fake search rankings.
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 dark:from-indigo-600/20 via-transparent to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen SaaS Traffic Control & AI Analytics Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Professional Website Traffic Testing & Analytics Platform
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Manage legitimate campaigns, run safe synthetic QA load simulations, track referral attribution, generate high-DA backlinks, and leverage AI recommendations—all with clear traffic classification.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-create-campaign-btn"
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Create Campaign <ArrowRight className="w-5 h-5" />
          </button>
          <button
            id="hero-try-demo-btn"
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
          >
            Explore Live Demo Dashboard
          </button>
        </div>

        {/* Feature Pill Matrix */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Bounded QA Simulation
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> 24/7 Website Uptime Monitor
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-center gap-2">
            <BarChart2 className="w-4 h-4 text-purple-600 dark:text-purple-400" /> GA4 & GSC API Integration
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Gemini AI Campaign Advisor
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How TrafficPilot AI Works</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
              Four streamlined steps to orchestrate, simulate, generate backlinks, and analyze website traffic.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Define Target URL', desc: 'Enter your domain or target landing page URL and select your campaign objective.' },
              { step: '02', title: 'Configure Session Profiles', desc: 'Select device distribution, browser profiles, wait times, page depth, and UTM parameters.' },
              { step: '03', title: 'Execute Safe Engine & Pings', desc: 'Run bounded HTTP synthetic sessions, generate high-DA backlinks, or share referral tracking links.' },
              { step: '04', title: 'Analyze & AI Optimize', desc: 'Review real-time response times, status codes, and receive Gemini AI optimization steps.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm">
                <div className="text-3xl font-extrabold text-indigo-600/40 dark:text-indigo-500/40 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Built for QA Engineers, Marketers & Developers</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
            Everything you need for comprehensive web traffic management in one production suite.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 shadow-sm transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Synthetic QA Traffic Testing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verify website responsiveness, cart page flows, and navigation depth under controlled, bounded concurrency.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 shadow-sm transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Website Uptime Monitoring</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scheduled background HTTP checks, SSL certificate expiration alerts, DNS verification, and latency history charts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 shadow-sm transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Strict Traffic Classification</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Separated analytics for Organic, Simulated, Referral, Paid, and Direct traffic—ensuring total transparency.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 shadow-sm transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Campaign Assistant</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Gemini 3.6 Flash identifies performance bottlenecks, explains traffic anomalies, and generates optimization steps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 shadow-sm transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Load & Stress Testing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simulate peak visitor spikes, track HTTP 500 error rates, and verify server connection pooling capacity safely.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 shadow-sm transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Referral & UTM Studio</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Create short redirect links like <code>/r/campaign-name</code>, generate tracking URLs, and download instant QR codes.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Transparent SaaS Pricing</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
              Flexible tiers designed for personal projects, growing startups, and enterprise teams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Plan</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">For testing & personal sites</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 5,000 Synthetic Sessions / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Up to 3 Active Campaigns</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 1 Website Monitor</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Basic UTM Generator</li>
                </ul>
              </div>
              <button
                onClick={onGetStarted}
                className="mt-8 w-full py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Start Free
              </button>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 relative flex flex-col justify-between shadow-xl shadow-indigo-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Tier</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">For growing startups & agencies</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$49</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100,000 Synthetic Sessions / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Unlimited Active Campaigns</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 10 Website Monitors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> High DA Backlink Generator</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> GA4 & Search Console Official API</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Gemini AI Campaign Advisor</li>
                </ul>
              </div>
              <button
                onClick={onGetStarted}
                className="mt-8 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-colors cursor-pointer"
              >
                Get Started Pro
              </button>
            </div>

            {/* Business */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Business Tier</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">For high-traffic platforms & QA teams</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$149</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 1,000,000 Synthetic Sessions / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Dedicated Load Testing Concurrency</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> REST API Key Access</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Admin Audit Logs & Custom Webhooks</li>
                </ul>
              </div>
              <button
                onClick={onGetStarted}
                className="mt-8 w-full py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Is synthetic traffic labeled as organic Google traffic?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              No, absolutely not. All synthetic QA test traffic generated by TrafficPilot AI carries explicit HTTP headers (<code>X-TrafficPilot-Simulated</code>) and is clearly separated in all reporting dashboards. We do not participate in click fraud or fake search engine rankings.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> How does the Backlink Generator work?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Our Astra Backlink Generator submits real ping requests and index notifications to over 50 high domain authority (DA 80+) directory nodes, search engine ping servers (Google, Bing, Yandex), web archives, and SEO diagnostic tools.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> How does the Website Monitoring feature work?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Our automated engine sends scheduled HTTP HEAD/GET requests to your specified target URL, verifies HTTP status codes, measures millisecond response times, resolves DNS records, and checks SSL certificate expiration dates.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200">TrafficPilot AI</span>
            <span>© 2026 TrafficPilot AI Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
            <a href="#privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#compliance" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Ethical Guidelines</a>
            <a href="#docs" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
