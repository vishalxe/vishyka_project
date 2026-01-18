import { getHealthColor, getHealthStatus } from '../../utils/healthCalculations';

interface HealthGaugeProps {
  health: number;
  size?: number;
}

export default function HealthGauge({ health, size = 200 }: HealthGaugeProps) {
  const healthColor = getHealthColor(health);
  const status = getHealthStatus(health);
  const circumference = 2 * Math.PI * (size / 2 - 10);
  const offset = circumference - (health / 100) * circumference;

  const colorMap: Record<string, string> = {
    'status-excellent': '#10b981',
    'status-good': '#fbbf24',
    'status-warning': '#f97316',
    'status-critical': '#ef4444',
  };
  const color = colorMap[healthColor] || '#10b981';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <defs>
            <linearGradient id={`gradient-${health}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 12}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="16"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 12}
            stroke={`url(#gradient-${health})`}
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-6xl font-bold ${healthColor} drop-shadow-lg`}>{health}</span>
          <span className="text-lg text-white/60 font-semibold">%</span>
          <div className="text-sm text-white/50 mt-2 capitalize font-medium">{status}</div>
        </div>
      </div>
    </div>
  );
}



