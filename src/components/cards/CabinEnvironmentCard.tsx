import { Settings } from 'lucide-react';

export default function CabinEnvironmentCard() {
  const airQuality = 72;
  const airQualityPercentage = (airQuality / 100) * 100;

  return (
    <div className="glass rounded-2xl p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Air Quality: Good</h3>
        <div className="w-10 h-10 bg-status-excellent/20 rounded-xl flex items-center justify-center">
          <span className="text-status-excellent text-lg">✓</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Air Quality Index</span>
          <span className="text-lg font-bold">{airQuality}/100</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-status-excellent rounded-full transition-all"
            style={{ width: `${airQualityPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-white/60">Smoke Detection:</span>
          <span className="text-status-excellent">OFF</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Cabin Temp:</span>
          <span>72°F</span>
        </div>
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-2 p-2 bg-white/5 rounded hover:bg-white/10 transition-all">
        <Settings className="w-4 h-4" />
        <span className="text-sm">Settings</span>
      </button>
    </div>
  );
}



