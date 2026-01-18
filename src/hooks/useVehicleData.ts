import { useVehicleStore } from '../store/vehicleStore';

export function useVehicleData() {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const selectedComponent = useVehicleStore((state) => state.selectedComponent);
  const setSelectedComponent = useVehicleStore((state) => state.setSelectedComponent);

  return {
    vehicleData,
    selectedComponent,
    setSelectedComponent,
  };
}



