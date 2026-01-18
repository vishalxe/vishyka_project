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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            stroke={`var(--color-${healthColor})`}
            strokeWidth="20"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-500 ${healthColor}`}
            style={{
              '--color-status-excellent': '#22c55e',
              '--color-status-good': '#eab308',
              '--color-status-warning': '#f97316',
              '--color-status-critical': '#ef4444',
            } as React.CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${healthColor}`}>{health}</span>
          <span className="text-sm text-white/60">%</span>
          <div className="text-xs text-white/40 mt-1 capitalize">{status}</div>
        </div>
      </div>
    </div>
  );
}



