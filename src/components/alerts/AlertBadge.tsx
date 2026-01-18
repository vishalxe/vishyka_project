import { Bell } from 'lucide-react';
import { useVehicleData } from '../../hooks/useVehicleData';

interface AlertBadgeProps {
  onClick?: () => void;
}

export default function AlertBadge({ onClick }: AlertBadgeProps) {
  const { vehicleData } = useVehicleData();
  const unacknowledgedAlerts = vehicleData.alerts.filter((a) => !a.acknowledged);
  const criticalAlerts = unacknowledgedAlerts.filter((a) => a.severity === 'critical');

  if (unacknowledgedAlerts.length === 0) return null;

  return (
    <button
      onClick={onClick}
      className="relative touch-target flex items-center justify-center"
    >
      <Bell className="w-6 h-6" />
      {unacknowledgedAlerts.length > 0 && (
        <span
          className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            criticalAlerts.length > 0
              ? 'bg-status-critical text-white'
              : 'bg-status-warning text-white'
          }`}
        >
          {unacknowledgedAlerts.length}
        </span>
      )}
    </button>
  );
}



