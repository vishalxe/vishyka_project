import { ArrowLeft, Play, MapPin, Phone, Check } from 'lucide-react';
import { useVehicleStore } from '../../store/vehicleStore';
import { getStatusDotColor } from '../../utils/colorUtils';

interface RepairGuideScreenProps {
  componentId?: string;
  onBack?: () => void;
}

export default function RepairGuideScreen({ componentId, onBack }: RepairGuideScreenProps) {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const component = componentId
    ? vehicleData.health.components.find((c) => c.id === componentId)
    : null;

  if (!component) {
    return (
      <div className="p-6">
        <p>No component selected for repair guide.</p>
      </div>
    );
  }

  const severityColors = {
    warning: 'border-status-warning bg-status-warning/10',
    critical: 'border-status-critical bg-status-critical/10',
    normal: 'border-status-excellent bg-status-excellent/10',
  };

  const steps = [
    {
      number: 1,
      title: 'Locate the component',
      description: `Find the ${component.name.toLowerCase()} on your vehicle.`,
    },
    {
      number: 2,
      title: 'Check current status',
      description: `Current reading: ${component.health}% health.`,
    },
    {
      number: 3,
      title: 'Follow safety procedures',
      description: 'Ensure vehicle is parked and engine is off before inspection.',
    },
    {
      number: 4,
      title: 'Perform inspection',
      description: 'Check for visible signs of wear, damage, or malfunction.',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="touch-target flex items-center justify-center text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-3xl font-bold">{component.name.toUpperCase()}</h1>
      </div>

      <div className={`rounded-lg p-6 border-2 ${severityColors[component.status]}`}>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Problem: {component.name} Issue Detected</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm">Severity:</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusDotColor(component.status).replace('bg-', 'bg-')}/20`}>
              <div className={`w-2 h-2 rounded-full ${getStatusDotColor(component.status)}`} />
              <span className="text-sm capitalize">
                {component.status === 'critical'
                  ? 'Critical - Stop driving now'
                  : component.status === 'warning'
                  ? 'Minor - Safe to drive short distances'
                  : 'Normal'}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/80 mt-2">
            {component.status === 'warning'
              ? 'Fill air within 50 miles'
              : component.status === 'critical'
              ? 'Immediate service required'
              : 'Monitor closely'}
          </p>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <Play className="w-6 h-6 text-green-light" />
          <h3 className="text-xl font-semibold">Video Guide (2:30)</h3>
        </div>
        <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-sm text-white/60">How to Check & Fix {component.name}</p>
            <p className="text-xs text-white/40 mt-1">Tap to play embedded video</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step-by-Step Instructions:</h3>
        {steps.map((step) => (
          <div key={step.number} className="bg-white/5 rounded-lg p-4 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-light/20 text-green-light rounded-full flex items-center justify-center font-bold">
              {step.number}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-white/60">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-lg p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-white/60">Tools Needed:</span>
          <span className="text-sm">Tire pressure gauge (optional)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-white/60">Estimated Time:</span>
          <span className="text-sm">5 minutes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-white/60">Cost:</span>
          <span className="text-sm">Free (at gas station)</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-light/20 text-green-light rounded-lg hover:bg-green-light/30 transition-all font-semibold">
          <MapPin className="w-5 h-5" />
          Find Nearest Service
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
          <Check className="w-5 h-5" />
          Mark as Fixed
        </button>
        <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
          <Phone className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

