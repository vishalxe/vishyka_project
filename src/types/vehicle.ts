export type ComponentStatus = 'normal' | 'warning' | 'critical';
export type ComponentType = 
  | 'engine' 
  | 'brake-fl' 
  | 'brake-fr' 
  | 'brake-rl' 
  | 'brake-rr'
  | 'tire-fl'
  | 'tire-fr'
  | 'tire-rl'
  | 'tire-rr'
  | 'battery'
  | 'transmission'
  | 'radiator'
  | 'headlight-l'
  | 'headlight-r'
  | 'exhaust'
  | 'suspension-fl'
  | 'suspension-fr'
  | 'suspension-rl'
  | 'suspension-rr';

export interface Temperature {
  current: number;
  min: number;
  max: number;
  unit: 'F' | 'C';
}

export interface ComponentData {
  id: string;
  name: string;
  type: ComponentType;
  health: number; // 0-100
  distanceTraveled: number; // miles/km
  temperature: Temperature;
  status: ComponentStatus;
  lastServiceDate: string;
  nextServiceDue: string;
  specificMetrics: Record<string, any>;
  position3D: { x: number; y: number; z: number };
  modelPartName?: string;
}

export interface VehicleHealth {
  overallHealth: number;
  components: ComponentData[];
  lastScan: string;
}

export interface Alert {
  id: string;
  componentId: string;
  severity: ComponentStatus;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface MaintenanceRecord {
  id: string;
  componentId: string;
  serviceType: string;
  date: string;
  mileage: number;
  cost?: number;
  notes?: string;
}

export interface MaintenancePrediction {
  id: string;
  componentId: string;
  serviceType: string;
  predictedDate: string;
  predictedMileage: number;
  confidence: number; // 0-100
  estimatedCost: {
    min: number;
    max: number;
  };
}

export interface VehicleData {
  health: VehicleHealth;
  alerts: Alert[];
  maintenanceHistory: MaintenanceRecord[];
  maintenancePredictions: MaintenancePrediction[];
  currentMileage: number;
  vin: string;
  model: string;
  year: number;
}



