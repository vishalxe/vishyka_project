import { AlertTriangle, X } from 'lucide-react';
import { Alert } from '../../types/vehicle';
import { useVehicleStore } from '../../store/vehicleStore';

interface CriticalAlertOverlayProps {
  alert: Alert;
  onAcknowledge: () => void;
}

export default function CriticalAlertOverlay({ alert, onAcknowledge }: CriticalAlertOverlayProps) {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const component = vehicleData.health.components.find((c) => c.id === alert.componentId);

  return (
    <div className="fixed inset-0 bg-status-critical/95 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border-4 border-status-critical shadow-2xl shadow-status-critical/50">
        <div className="flex items-start gap-6 mb-6">
          <AlertTriangle className="w-16 h-16 text-status-critical flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">⚠️ CRITICAL ALERT ⚠️</h1>
            <h2 className="text-3xl font-bold mb-4">{component?.name || 'Component'} Issue</h2>
            <p className="text-xl mb-2">{alert.message}</p>
            {component && (
              <p className="text-lg text-white/80">
                Temperature: {component.temperature.current}°{component.temperature.unit}{' '}
                (Danger Zone)
              </p>
            )}
          </div>
        </div>

        <div className="bg-status-critical/20 rounded-xl p-6 mb-6 border border-status-critical/30">
          <h3 className="text-2xl font-bold mb-4">PULL OVER SAFELY NOW</h3>
          <ol className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="font-bold">1.</span>
              <span>Find safe spot immediately</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">2.</span>
              <span>Turn off engine</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">3.</span>
              <span>DO NOT open hood yet</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">4.</span>
              <span>Wait 15 minutes to cool</span>
            </li>
          </ol>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onAcknowledge}
            className="flex-1 py-4 bg-status-critical text-white rounded-xl hover:bg-status-critical/90 transition-all font-bold text-xl touch-target shadow-lg shadow-status-critical/50 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            I'VE STOPPED ✓
          </button>
        </div>

        <p className="text-center text-sm text-white/60 mt-4">
          Nearest safe stopping point shown on map
        </p>
      </div>
    </div>
  );
}



