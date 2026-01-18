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
    <div className="h-20 bg-black/30 backdrop-blur-sm border-t border-white/10 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`touch-target flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? 'bg-green-light/20 text-green-light'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'text-green-light' : ''}`} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}



