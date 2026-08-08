import React from 'react';
import {
  Activity,
  Bell,
  Search,
  Sun,
  Moon,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userRole: UserRole;
  setUserRole?: (role: UserRole) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onOpenNewCampaign?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  userRole,
  theme,
  setTheme,
  onOpenNewCampaign,
}) => {
  const getViewTitle = (view: string) => {
    switch (view) {
      case 'dashboard': return 'Main Performance';
      case 'campaigns': return 'Campaign Management';
      case 'campaign_builder': return 'Campaign Studio';
      case 'analytics': return 'Analytics Hub';
      case 'synthetic': return 'Synthetic QA Engine';
      case 'monitor': return 'Website Monitor';
      case 'load_testing': return 'Load & Stress Testing';
      case 'referral_utm': return 'Referral & UTM Studio';
      case 'geo_device': return 'Geo & Device Analytics';
      case 'ai_assistant': return 'AI Assistant';
      case 'console': return 'Real-Time Console';
      case 'integrations': return 'Google GA4 & GSC';
      case 'blogger': return 'Blogger Widget Studio';
      case 'seo': return 'SEO & Schema Suite';
      case 'backlink': return 'Astra Backlink Generator';
      case 'admin': return 'Admin & Safety Panel';
      case 'subscription': return 'Plans & API Keys';
      default: return 'TrafficPilot AI';
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 shrink-0 shadow-sm transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Brand Logo & Breadcrumb Navigation */}
        <div className="flex items-center gap-4">
          <button
            id="brand-logo-btn"
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              T
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                TrafficPilot <span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-slate-500 pl-4 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveView('dashboard')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              Dashboard
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              {getViewTitle(activeView)}
            </span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex items-center relative w-72">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Public Landing Page Toggle */}
          <button
            id="toggle-public-landing-btn"
            onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {activeView === 'landing' ? 'App Dashboard' : 'Landing Page'}
            </span>
          </button>

          {/* New Campaign CTA Button */}
          <button
            id="quick-new-campaign-btn"
            onClick={onOpenNewCampaign || (() => setActiveView('campaign_builder'))}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Campaign</span>
          </button>

          {/* Theme Switcher */}
          <button
            id="theme-toggle-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* User Profile Badge */}
          <div className="flex items-center space-x-2 pl-3 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-200 dark:border-indigo-800">
              JS
            </div>
            <div className="hidden md:block text-left leading-tight">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">
                John Smith
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                {userRole === 'admin' ? 'Admin' : 'Pro Tier'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

