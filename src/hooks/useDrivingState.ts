import { useVehicleStore } from '../store/vehicleStore';

export function useDrivingState() {
  const isDriving = useVehicleStore((state) => state.isDriving);
  const setIsDriving = useVehicleStore((state) => state.setIsDriving);

  return {
    isDriving,
    setIsDriving,
  };
}



