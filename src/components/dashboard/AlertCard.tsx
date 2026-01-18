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
  const setSelectedComponent = useVehicleStore((state) => state.setSelectedComponent);
  const component = vehicleData.health.components.find((c) => c.id === alert.componentId);

  if (!component) return null;

  const severityColors = {
    warning: 'border-status-warning bg-status-warning/10',
    critical: 'border-status-critical bg-status-critical/10',
    normal: 'border-status-excellent bg-status-excellent/10',
  };

  return (
    <div className={`glass-strong rounded-2xl p-6 border-2 ${severityColors[alert.severity]} shadow-xl animate-fade-in`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            alert.severity === 'critical' ? 'bg-status-critical/20' : 'bg-status-warning/20'
          }`}>
            <AlertTriangle
              className={`w-6 h-6 ${
                alert.severity === 'critical' ? 'text-status-critical' : 'text-status-warning'
              }`}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Attention Needed</h3>
            <p className="text-lg mb-2 text-white/90">{alert.message}</p>
            <p className="text-sm text-white/60 mb-2">
              Component: <span className="font-semibold text-white/80">{getComponentDisplayName(component.type)}</span>
            </p>
            {alert.severity === 'warning' && (
              <div className="mt-3 px-3 py-2 bg-status-warning/10 rounded-lg border border-status-warning/20">
                <p className="text-sm text-white/90">
                  Safe to drive short distances. Address within 50 miles.
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => acknowledgeAlert(alert.id)}
          className="touch-target flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => {
            const event = new CustomEvent('navigate', { detail: 'diagnostics' });
            window.dispatchEvent(event);
            setSelectedComponent(component);
          }}
          className="button-primary flex-1"
        >
          Show Me How
        </button>
        <button 
          onClick={() => {
            // Could integrate with maps API here
            alert(`Finding nearest service center for ${getComponentDisplayName(component.type)}...`);
          }}
          className="button-secondary flex-1"
        >
          Find Service
        </button>
      </div>
    </div>
  );
}



