import { Home, Wrench, History, Settings } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'diagnostics', label: 'Diagnostics', icon: Wrench },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-20 glass-strong border-t border-white/10 flex items-center justify-around shadow-lg shadow-black/20">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`touch-target flex flex-col items-center justify-center gap-1.5 px-6 py-2 rounded-xl transition-all duration-300 relative ${
              isActive
                ? 'text-green-400'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-green-500/10 rounded-xl border border-green-500/20" />
            )}
            <Icon className={`w-6 h-6 relative z-10 transition-transform ${isActive ? 'scale-110' : ''}`} />
            <span className={`text-xs font-semibold relative z-10 ${isActive ? 'text-green-400' : ''}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}



