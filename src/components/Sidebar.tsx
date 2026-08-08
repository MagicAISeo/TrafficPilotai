import React from 'react';
import {
  LayoutDashboard,
  Rocket,
  BarChart3,
  Cpu,
  Activity,
  Gauge,
  Share2,
  Globe2,
  Sparkles,
  Terminal,
  Link2,
  Code2,
  Search,
  ShieldAlert,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  userRole: 'user' | 'admin';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  collapsed,
  setCollapsed,
  userRole,
}) => {
  const navItems = [
    {
      group: 'MAIN PLATFORM',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'campaigns', label: 'Campaigns', icon: Rocket },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      group: 'TESTING & SIMULATION',
      items: [
        { id: 'synthetic', label: 'Synthetic QA Engine', icon: Cpu },
        { id: 'monitor', label: 'Website Monitor', icon: Activity },
        { id: 'load_testing', label: 'Load & Stress Testing', icon: Gauge },
      ],
    },
    {
      group: 'TRAFFIC & ATTRIBUTION',
      items: [
        { id: 'referral_utm', label: 'Referral & UTM Studio', icon: Share2 },
        { id: 'geo_device', label: 'Geo & Device Analytics', icon: Globe2 },
        { id: 'ai_assistant', label: 'AI Campaign Assistant', icon: Sparkles },
      ],
    },
    {
      group: 'DEV & INTEGRATIONS',
      items: [
        { id: 'console', label: 'Real-Time Console', icon: Terminal },
        { id: 'integrations', label: 'Google GA4 & GSC', icon: Link2 },
        { id: 'blogger', label: 'Blogger Widget', icon: Code2 },
        { id: 'seo', label: 'SEO & Schema Suite', icon: Search },
        { id: 'backlink', label: 'Backlink Generator', icon: Link2 },
      ],
    },
    {
      group: 'ACCOUNT & SYSTEM',
      items: [
        { id: 'subscription', label: 'Plans & API Keys', icon: CreditCard },
        ...(userRole === 'admin'
          ? [{ id: 'admin', label: 'Admin Safety Panel', icon: ShieldAlert }]
          : []),
      ],
    },
  ];

  return (
    <aside
      className={`relative bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex flex-col h-full shrink-0 transition-all duration-200 z-30 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle */}
      <button
        id="toggle-sidebar-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-md cursor-pointer z-40 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navItems.map((group, idx) => (
          <div key={idx}>
            {!collapsed && (
              <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                {group.group}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => setActiveView(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-white font-bold border-l-3 border-indigo-600 dark:border-indigo-500 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    } ${collapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Plan Usage Card at Bottom */}
      {!collapsed && (
        <div className="m-3 p-4 bg-slate-50 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-inner">
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Plan Usage</p>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">PRO</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mb-2 overflow-hidden">
            <div className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full w-[65%]" />
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 font-mono">65,000 / 100,000 sessions</p>
        </div>
      )}
    </aside>
  );
};

