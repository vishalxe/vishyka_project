import { AlertTriangle, X } from 'lucide-react';
import { Alert } from '../../types/vehicle';
import { getComponentDisplayName } from '../../utils/componentMapping';
import { useVehicleStore } from '../../store/vehicleStore';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const acknowledgeAlert = useVehicleStore((state) => state.acknowledgeAlert);
  const component = vehicleData.health.components.find((c) => c.id === alert.componentId);

  if (!component) return null;

  const severityColors = {
    warning: 'border-status-warning bg-status-warning/10',
    critical: 'border-status-critical bg-status-critical/10',
    normal: 'border-status-excellent bg-status-excellent/10',
  };

  return (
    <div className={`rounded-lg p-6 border-2 ${severityColors[alert.severity]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <AlertTriangle
            className={`w-8 h-8 ${
              alert.severity === 'critical' ? 'text-status-critical' : 'text-status-warning'
            }`}
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Attention Needed</h3>
            <p className="text-lg mb-2">{alert.message}</p>
            <p className="text-sm text-white/60">
              Component: {getComponentDisplayName(component.type)}
            </p>
            {alert.severity === 'warning' && (
              <p className="text-sm text-white/80 mt-2">
                Safe to drive short distances. Address within 50 miles.
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => acknowledgeAlert(alert.id)}
          className="touch-target flex items-center justify-center text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-green-light/20 text-green-light rounded-lg hover:bg-green-light/30 transition-all">
          Show Me How
        </button>
        <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
          Find Service
        </button>
      </div>
    </div>
  );
}



