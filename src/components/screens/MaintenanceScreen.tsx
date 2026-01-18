import { Plus, Calendar, CheckCircle2 } from 'lucide-react';
import { useVehicleData } from '../../hooks/useVehicleData';
import { getHealthColor } from '../../utils/healthCalculations';

export default function MaintenanceScreen() {
  const { vehicleData } = useVehicleData();
  const predictions = vehicleData.maintenancePredictions;
  const history = vehicleData.maintenanceHistory;

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Maintenance Schedule</h1>
        <button className="button-primary flex items-center gap-2 touch-target">
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming (AI Predictions)</h2>
          <div className="space-y-4">
            {predictions.map((prediction) => {
              const component = vehicleData.health.components.find(
                (c) => c.id === prediction.componentId
              );
              const daysUntil = getDaysUntil(prediction.predictedDate);
              const confidenceColor =
                prediction.confidence >= 90
                  ? 'text-status-excellent'
                  : prediction.confidence >= 70
                  ? 'text-status-good'
                  : 'text-status-warning';

              return (
                <div key={prediction.id} className="glass rounded-2xl p-6 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <Calendar className="w-6 h-6 text-green-light mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          In {daysUntil > 0 ? `${daysUntil} days` : 'Due now'} (est.{' '}
                          {prediction.predictedMileage.toLocaleString()} mi)
                        </h3>
                        <p className="text-lg text-green-light">{prediction.serviceType}</p>
                        {component && (
                          <p className="text-sm text-white/60 mt-1">
                            Component: {component.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Confidence:</span>
                      <span className={`font-semibold ${confidenceColor}`}>
                        {prediction.confidence}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Estimated Cost:</span>
                      <span className="font-semibold">
                        ${prediction.estimatedCost.min} - ${prediction.estimatedCost.max}
                      </span>
                    </div>
                  </div>

                  <button className="button-primary w-full">
                    Schedule Service
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h2 className="text-2xl font-semibold mb-4">Completed</h2>
          <div className="space-y-3">
            {history.map((record) => {
              const component = vehicleData.health.components.find(
                (c) => c.id === record.componentId
              );
              return (
                <div
                  key={record.id}
                  className="glass rounded-xl p-4 flex items-center justify-between card-hover"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-status-excellent" />
                    <div>
                      <p className="font-semibold">{record.serviceType}</p>
                      <p className="text-sm text-white/60">
                        {new Date(record.date).toLocaleDateString()} •{' '}
                        {record.mileage.toLocaleString()} miles
                      </p>
                      {component && (
                        <p className="text-xs text-white/40 mt-1">{component.name}</p>
                      )}
                    </div>
                  </div>
                  {record.cost && (
                    <div className="text-right">
                      <p className="font-semibold">${record.cost}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button className="mt-4 text-sm text-green-light hover:underline">
            View Full History →
          </button>
        </div>
      </div>
    </div>
  );
}



