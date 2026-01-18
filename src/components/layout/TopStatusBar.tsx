import { Clock, Wifi, Battery, Settings, User } from 'lucide-react';
import { useVehicleStore } from '../../store/vehicleStore';
import { getHealthColor } from '../../utils/healthCalculations';
import AlertBadge from '../alerts/AlertBadge';

export default function TopStatusBar() {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const health = vehicleData.health.overallHealth;
  const healthColor = getHealthColor(health);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="h-[70px] glass-strong border-b border-white/10 flex items-center justify-between px-8 shadow-lg shadow-black/20">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
            <span className="text-sm font-bold text-white">V</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/70">Health Score</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
              <span className={`text-xl font-bold ${healthColor}`}>{health}%</span>
              <div className={`w-2.5 h-2.5 rounded-full ${healthColor.replace('text-', 'bg-')} animate-pulse`} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
          <Clock className="w-4 h-4 text-white/70" />
          <span className="text-sm font-medium">{currentTime}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
          <span className="text-sm font-medium">72°F</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
          <Wifi className="w-4 h-4 text-status-excellent" />
          <div className="w-2 h-2 rounded-full bg-status-excellent animate-pulse" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
          <Battery className="w-4 h-4 text-white/70" />
          <span className="text-sm font-medium">89%</span>
        </div>
        <AlertBadge />
        <button className="touch-target flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all duration-200">
          <Settings className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
        </button>
        <button className="touch-target flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all duration-200">
          <User className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}

