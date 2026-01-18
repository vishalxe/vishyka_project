import { ComponentData } from '../../types/vehicle';
import { getComponentIcon, getComponentDisplayName } from '../../utils/componentMapping';
import { getStatusDotColor } from '../../utils/colorUtils';

interface SystemStatusGridProps {
  components: ComponentData[];
  onComponentClick: (component: ComponentData) => void;
}

export default function SystemStatusGrid({ components, onComponentClick }: SystemStatusGridProps) {
  // Group components by type for display
  const groupedComponents = components.reduce((acc, comp) => {
    const baseType = comp.type.split('-')[0];
    if (!acc[baseType]) {
      acc[baseType] = [];
    }
    acc[baseType].push(comp);
    return acc;
  }, {} as Record<string, ComponentData[]>);

  const mainComponents = ['engine', 'brake', 'battery', 'tire', 'transmission', 'radiator'];

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {mainComponents.map((baseType) => {
        const comps = groupedComponents[baseType] || [];
        if (comps.length === 0) return null;

        const mainComp = comps[0];
        const avgHealth = Math.round(
          comps.reduce((sum, c) => sum + c.health, 0) / comps.length
        );
        const worstStatus = comps.some((c) => c.status === 'critical')
          ? 'critical'
          : comps.some((c) => c.status === 'warning')
          ? 'warning'
          : 'normal';

        return (
          <button
            key={baseType}
            onClick={() => onComponentClick(mainComp)}
            className="touch-target bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all flex flex-col items-center gap-2"
          >
            <span className="text-2xl">{getComponentIcon(mainComp.type as any)}</span>
            <span className="text-sm font-medium text-center">
              {getComponentDisplayName(mainComp.type)}
            </span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusDotColor(worstStatus)}`} />
              <span className="text-lg font-bold">{avgHealth}%</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}



