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
    <div className="flex flex-col gap-6">
      {activeAlerts.length > 0 ? (
        <AlertCard alert={activeAlerts[0]} />
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Vehicle Health: Excellent ✓</h2>
            <HealthGauge health={health} size={240} />
          </div>

          <SystemStatusGrid
            components={vehicleData.health.components}
            onComponentClick={onComponentClick}
          />

          {nextMaintenance && (
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Next Maintenance</h3>
              <p className="text-sm text-white/80">
                {nextMaintenance.serviceType} due in approximately{' '}
                {Math.ceil(
                  (new Date(nextMaintenance.predictedDate).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                days
              </p>
              <p className="text-xs text-white/60 mt-1">
                Estimated at {nextMaintenance.predictedMileage.toLocaleString()} miles
              </p>
            </div>
          )}

          <button className="w-full py-3 bg-green-light/20 text-green-light rounded-lg hover:bg-green-light/30 transition-all font-semibold">
            View Full Report
          </button>
        </>
      )}
    </div>
  );
}



