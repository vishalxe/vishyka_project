import { RefreshCw, ChevronRight } from 'lucide-react';
import { useVehicleData } from '../../hooks/useVehicleData';
import { ComponentData } from '../../types/vehicle';
import { getHealthColor, getHealthStatus } from '../../utils/healthCalculations';
import { getStatusDotColor } from '../../utils/colorUtils';
import { getComponentIcon, getComponentDisplayName } from '../../utils/componentMapping';
import { useState } from 'react';

export default function DiagnosticsScreen() {
  const { vehicleData, setSelectedComponent } = useVehicleData();
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const toggleExpand = (componentId: string) => {
    const newExpanded = new Set(expandedComponents);
    if (newExpanded.has(componentId)) {
      newExpanded.delete(componentId);
    } else {
      newExpanded.add(componentId);
    }
    setExpandedComponents(newExpanded);
  };

  const groupedComponents = vehicleData.health.components.reduce((acc, comp) => {
    const baseType = comp.type.split('-')[0];
    if (!acc[baseType]) {
      acc[baseType] = [];
    }
    acc[baseType].push(comp);
    return acc;
  }, {} as Record<string, ComponentData[]>);

  const overallHealth = Math.round(
    vehicleData.health.components.reduce((sum, c) => sum + c.health, 0) /
      vehicleData.health.components.length
  );
  const healthColor = getHealthColor(overallHealth);
  const healthStatus = getHealthStatus(overallHealth);

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Diagnostics</h1>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="button-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
        >
          <RefreshCw className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>Scan Now</span>
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-bold">All Systems:</span>
          <span className={`text-2xl font-bold ${healthColor}`}>{healthStatus.toUpperCase()}</span>
          <div className={`w-3 h-3 rounded-full ${healthColor.replace('text-', 'bg-')}`} />
        </div>
        <div className="text-sm text-white/60">
          Last scan: {new Date(vehicleData.health.lastScan).toLocaleString()}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedComponents).map(([baseType, components]) => {
          const avgHealth = Math.round(
            components.reduce((sum, c) => sum + c.health, 0) / components.length
          );
          const worstStatus = components.some((c) => c.status === 'critical')
            ? 'critical'
            : components.some((c) => c.status === 'warning')
            ? 'warning'
            : 'normal';
          const healthColor = getHealthColor(avgHealth);
          const isExpanded = expandedComponents.has(baseType);

          return (
            <div key={baseType} className="glass rounded-xl overflow-hidden card-hover">
              <button
                onClick={() => toggleExpand(baseType)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getComponentIcon(components[0].type as any)}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">
                      {getComponentDisplayName(components[0].type)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusDotColor(worstStatus)}`} />
                      <span className={`text-lg font-bold ${healthColor}`}>{avgHealth}%</span>
                      <span className="text-sm text-white/60 capitalize">
                        {worstStatus === 'critical'
                          ? 'CRITICAL'
                          : worstStatus === 'warning'
                          ? 'ATTENTION'
                          : 'EXCELLENT'}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className="glass rounded-xl p-4 space-y-2 cursor-pointer hover:bg-white/10 transition-all"
                      onClick={() => setSelectedComponent(component)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{component.name}</span>
                        <span className={`font-bold ${getHealthColor(component.health)}`}>
                          {component.health}%
                        </span>
                      </div>
                      <div className="text-sm text-white/60 space-y-1">
                        <div>
                          Temperature: {component.temperature.current}°
                          {component.temperature.unit} (Normal)
                        </div>
                        {component.type.startsWith('brake') && (
                          <div>
                            Pad Life: {component.specificMetrics.padLife}% remaining
                          </div>
                        )}
                        {component.type.startsWith('tire') && (
                          <div>
                            Pressure: {component.specificMetrics.pressure} PSI
                          </div>
                        )}
                        {component.type === 'engine' && (
                          <div>
                            Oil Level: {component.specificMetrics.oilLevel}% | RPM Range:{' '}
                            {component.specificMetrics.rpmRange}
                          </div>
                        )}
                      </div>
                      <button className="text-sm text-green-light hover:underline mt-2">
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



