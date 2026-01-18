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
    <div className="h-[60px] bg-black/30 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-light to-green-dark rounded flex items-center justify-center">
            <span className="text-xs font-bold">V</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Health Score:</span>
            <span className={`text-lg font-bold ${healthColor}`}>{health}%</span>
            <div className={`w-2 h-2 rounded-full ${healthColor.replace('text-', 'bg-')}`} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{currentTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">72°F</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <div className="w-2 h-2 rounded-full bg-status-excellent" />
        </div>
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4" />
          <span className="text-sm">89%</span>
        </div>
        <AlertBadge />
        <button className="touch-target flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </button>
        <button className="touch-target flex items-center justify-center">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

