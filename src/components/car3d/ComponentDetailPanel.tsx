import { X } from 'lucide-react';
import { ComponentData } from '../../types/vehicle';
import { getHealthColor } from '../../utils/healthCalculations';
import { getStatusDotColor } from '../../utils/colorUtils';

interface ComponentDetailPanelProps {
  component: ComponentData | null;
  onClose: () => void;
}

export default function ComponentDetailPanel({ component, onClose }: ComponentDetailPanelProps) {
  if (!component) return null;

  const healthColor = getHealthColor(component.health);

  return (
    <div className="fixed right-0 top-0 h-full w-[40%] glass-strong border-l border-white/20 p-8 overflow-y-auto z-50 animate-slide-in shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{component.name}</h2>
        <button
          onClick={onClose}
          className="touch-target flex items-center justify-center text-white/60 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Health Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">Health Score</span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
            <span className={`text-3xl font-bold ${healthColor}`}>{component.health}%</span>
            <div className={`w-3 h-3 rounded-full ${getStatusDotColor(component.status)} animate-pulse`} />
          </div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${healthColor.replace('text-', 'bg-')} rounded-full transition-all shadow-lg`}
            style={{ width: `${component.health}%` }}
          />
        </div>
      </div>

      {/* Distance Traveled */}
      <div className="mb-6 glass rounded-xl p-5">
        <h3 className="text-sm text-white/60 mb-2">Distance Traveled</h3>
        <p className="text-2xl font-bold">
          {component.distanceTraveled.toLocaleString()} miles
        </p>
        <p className="text-xs text-white/60 mt-1">Since last service</p>
      </div>

      {/* Temperature */}
      <div className="mb-6 glass rounded-xl p-5">
        <h3 className="text-sm text-white/60 mb-4">Temperature</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Current</span>
              <span className="text-lg font-bold">
                {component.temperature.current}°{component.temperature.unit}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-status-excellent rounded-full"
                style={{
                  width: `${
                    ((component.temperature.current - component.temperature.min) /
                      (component.temperature.max - component.temperature.min)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Min: {component.temperature.min}°{component.temperature.unit}</span>
            <span>Max: {component.temperature.max}°{component.temperature.unit}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        <h3 className="text-sm text-white/60 mb-2">Status</h3>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusDotColor(component.status).replace('bg-', 'bg-')}/20`}>
          <div className={`w-2 h-2 rounded-full ${getStatusDotColor(component.status)}`} />
          <span className="text-sm capitalize">{component.status}</span>
        </div>
      </div>

      {/* Service Dates */}
      <div className="mb-6 space-y-3">
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm text-white/60 mb-1">Last Service</h3>
          <p className="font-semibold text-lg">{new Date(component.lastServiceDate).toLocaleDateString()}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm text-white/60 mb-1">Next Service Due</h3>
          <p className="font-semibold text-lg">{new Date(component.nextServiceDue).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Component-Specific Metrics */}
      {Object.keys(component.specificMetrics).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Component Metrics</h3>
          <div className="space-y-2">
            {Object.entries(component.specificMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between glass rounded-lg p-3">
                <span className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="font-semibold text-white/90">{typeof value === 'number' ? value.toFixed(1) : value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button className="button-primary w-full">
          View Full Diagnostics
        </button>
        <button className="button-secondary w-full">
          Schedule Service
        </button>
      </div>
    </div>
  );
}



