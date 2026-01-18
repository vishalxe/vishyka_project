import { useVehicleData } from '../../hooks/useVehicleData';
import HealthGauge from './HealthGauge';
import SystemStatusGrid from './SystemStatusGrid';
import AlertCard from './AlertCard';
import { ComponentData } from '../../types/vehicle';

interface HealthOverviewProps {
  onComponentClick: (component: ComponentData) => void;
}

export default function HealthOverview({ onComponentClick }: HealthOverviewProps) {
  const { vehicleData } = useVehicleData();
  const health = vehicleData.health.overallHealth;
  const activeAlerts = vehicleData.alerts.filter((a) => !a.acknowledged);
  const nextMaintenance = vehicleData.maintenancePredictions[0];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {activeAlerts.length > 0 ? (
        <AlertCard alert={activeAlerts[0]} />
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Vehicle Health: Excellent
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-status-excellent animate-pulse" />
              <span className="text-sm text-white/60">All systems operational</span>
            </div>
            <HealthGauge health={health} size={240} />
          </div>

          <SystemStatusGrid
            components={vehicleData.health.components}
            onComponentClick={onComponentClick}
          />

          {nextMaintenance && (
            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold">Next Maintenance</h3>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-lg">🔧</span>
                </div>
              </div>
              <p className="text-base text-white/90 mb-2">
                {nextMaintenance.serviceType} due in approximately{' '}
                <span className="font-bold text-green-400">
                  {Math.ceil(
                    (new Date(nextMaintenance.predictedDate).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </span>{' '}
                days
              </p>
              <p className="text-sm text-white/60">
                Estimated at {nextMaintenance.predictedMileage.toLocaleString()} miles
              </p>
            </div>
          )}

          <button 
            onClick={() => {
              // Navigate to diagnostics screen
              const event = new CustomEvent('navigate', { detail: 'diagnostics' });
              window.dispatchEvent(event);
            }}
            className="button-primary w-full"
          >
            View Full Report
          </button>
        </>
      )}
    </div>
  );
}



