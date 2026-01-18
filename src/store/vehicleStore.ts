import { create } from 'zustand';
import { VehicleData, ComponentData, Alert } from '../types/vehicle';
import { mockVehicleData } from '../data/mockData';

interface VehicleStore {
  vehicleData: VehicleData;
  selectedComponent: ComponentData | null;
  setSelectedComponent: (component: ComponentData | null) => void;
  acknowledgeAlert: (alertId: string) => void;
  isDriving: boolean;
  setIsDriving: (driving: boolean) => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicleData: mockVehicleData,
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  acknowledgeAlert: (alertId) =>
    set((state) => ({
      vehicleData: {
        ...state.vehicleData,
        alerts: state.vehicleData.alerts.map((alert) =>
          alert.id === alertId ? { ...alert, acknowledged: true } : alert
        ),
      },
    })),
  isDriving: false,
  setIsDriving: (driving) => set({ isDriving: driving }),
}));



