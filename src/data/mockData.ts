import { VehicleData, ComponentData, Alert, MaintenanceRecord, MaintenancePrediction } from '../types/vehicle';

export const mockComponents: ComponentData[] = [
  {
    id: 'engine-1',
    name: 'Engine',
    type: 'engine',
    health: 94,
    distanceTraveled: 12500,
    temperature: { current: 195, min: 180, max: 220, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-10-15',
    nextServiceDue: '2025-01-15',
    specificMetrics: {
      oilLevel: 85,
      rpmRange: '800-6500',
      pressure: 45,
      oilLife: 65
    },
    position3D: { x: 0, y: 0.5, z: 1.5 },
  },
  {
    id: 'brake-fl',
    name: 'Front Left Brake',
    type: 'brake-fl',
    health: 65,
    distanceTraveled: 35000,
    temperature: { current: 185, min: 150, max: 250, unit: 'F' },
    status: 'warning',
    lastServiceDate: '2024-08-20',
    nextServiceDue: '2025-02-20',
    specificMetrics: {
      padLife: 35,
      fluidLevel: 80,
      rotorThickness: 0.8
    },
    position3D: { x: -0.8, y: -0.3, z: 1.2 },
  },
  {
    id: 'brake-fr',
    name: 'Front Right Brake',
    type: 'brake-fr',
    health: 70,
    distanceTraveled: 35000,
    temperature: { current: 180, min: 150, max: 250, unit: 'F' },
    status: 'warning',
    lastServiceDate: '2024-08-20',
    nextServiceDue: '2025-02-20',
    specificMetrics: {
      padLife: 40,
      fluidLevel: 80,
      rotorThickness: 0.85
    },
    position3D: { x: 0.8, y: -0.3, z: 1.2 },
  },
  {
    id: 'brake-rl',
    name: 'Rear Left Brake',
    type: 'brake-rl',
    health: 75,
    distanceTraveled: 35000,
    temperature: { current: 170, min: 150, max: 250, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-08-20',
    nextServiceDue: '2025-03-20',
    specificMetrics: {
      padLife: 55,
      fluidLevel: 85,
      rotorThickness: 0.9
    },
    position3D: { x: -0.8, y: -0.3, z: -1.2 },
  },
  {
    id: 'brake-rr',
    name: 'Rear Right Brake',
    type: 'brake-rr',
    health: 75,
    distanceTraveled: 35000,
    temperature: { current: 175, min: 150, max: 250, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-08-20',
    nextServiceDue: '2025-03-20',
    specificMetrics: {
      padLife: 55,
      fluidLevel: 85,
      rotorThickness: 0.9
    },
    position3D: { x: 0.8, y: -0.3, z: -1.2 },
  },
  {
    id: 'tire-fl',
    name: 'Front Left Tire',
    type: 'tire-fl',
    health: 85,
    distanceTraveled: 28000,
    temperature: { current: 95, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-11-15',
    nextServiceDue: '2025-05-15',
    specificMetrics: {
      pressure: 35,
      treadDepth: 7.5,
      wear: 15
    },
    position3D: { x: -0.8, y: -0.4, z: 1.2 },
  },
  {
    id: 'tire-fr',
    name: 'Front Right Tire',
    type: 'tire-fr',
    health: 88,
    distanceTraveled: 28000,
    temperature: { current: 92, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-11-15',
    nextServiceDue: '2025-05-15',
    specificMetrics: {
      pressure: 35,
      treadDepth: 8.0,
      wear: 12
    },
    position3D: { x: 0.8, y: -0.4, z: 1.2 },
  },
  {
    id: 'tire-rl',
    name: 'Rear Left Tire',
    type: 'tire-rl',
    health: 90,
    distanceTraveled: 28000,
    temperature: { current: 88, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-11-15',
    nextServiceDue: '2025-05-15',
    specificMetrics: {
      pressure: 36,
      treadDepth: 8.5,
      wear: 10
    },
    position3D: { x: -0.8, y: -0.4, z: -1.2 },
  },
  {
    id: 'tire-rr',
    name: 'Rear Right Tire',
    type: 'tire-rr',
    health: 90,
    distanceTraveled: 28000,
    temperature: { current: 90, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-11-15',
    nextServiceDue: '2025-05-15',
    specificMetrics: {
      pressure: 36,
      treadDepth: 8.5,
      wear: 10
    },
    position3D: { x: 0.8, y: -0.4, z: -1.2 },
  },
  {
    id: 'battery-1',
    name: 'Battery',
    type: 'battery',
    health: 82,
    distanceTraveled: 45000,
    temperature: { current: 75, min: 60, max: 100, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-06-10',
    nextServiceDue: '2025-06-10',
    specificMetrics: {
      chargeLevel: 89,
      voltage: 12.6,
      capacity: 85
    },
    position3D: { x: 0, y: 0.3, z: 1.8 },
  },
  {
    id: 'transmission-1',
    name: 'Transmission',
    type: 'transmission',
    health: 88,
    distanceTraveled: 45000,
    temperature: { current: 175, min: 160, max: 200, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-09-01',
    nextServiceDue: '2025-09-01',
    specificMetrics: {
      fluidLevel: 90,
      gearStatus: 'D',
      shiftQuality: 95
    },
    position3D: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'radiator-1',
    name: 'Radiator',
    type: 'radiator',
    health: 91,
    distanceTraveled: 45000,
    temperature: { current: 190, min: 180, max: 210, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-10-15',
    nextServiceDue: '2025-10-15',
    specificMetrics: {
      coolantLevel: 88,
      pressure: 15,
      efficiency: 92
    },
    position3D: { x: 0, y: 0.6, z: 1.8 },
  },
  {
    id: 'headlight-l',
    name: 'Left Headlight',
    type: 'headlight-l',
    health: 95,
    distanceTraveled: 45000,
    temperature: { current: 85, min: 70, max: 110, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-01-15',
    nextServiceDue: '2026-01-15',
    specificMetrics: {
      brightness: 95,
      bulbLife: 90,
      alignment: 98
    },
    position3D: { x: -0.6, y: 0.5, z: 1.9 },
  },
  {
    id: 'headlight-r',
    name: 'Right Headlight',
    type: 'headlight-r',
    health: 95,
    distanceTraveled: 45000,
    temperature: { current: 87, min: 70, max: 110, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-01-15',
    nextServiceDue: '2026-01-15',
    specificMetrics: {
      brightness: 95,
      bulbLife: 90,
      alignment: 98
    },
    position3D: { x: 0.6, y: 0.5, z: 1.9 },
  },
  {
    id: 'exhaust-1',
    name: 'Exhaust System',
    type: 'exhaust',
    health: 87,
    distanceTraveled: 45000,
    temperature: { current: 450, min: 300, max: 600, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-07-20',
    nextServiceDue: '2025-07-20',
    specificMetrics: {
      emissionsStatus: 'pass',
      backpressure: 2.1,
      efficiency: 88
    },
    position3D: { x: 0, y: -0.2, z: -1.8 },
  },
  {
    id: 'suspension-fl',
    name: 'Front Left Suspension',
    type: 'suspension-fl',
    health: 89,
    distanceTraveled: 45000,
    temperature: { current: 90, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-05-10',
    nextServiceDue: '2025-05-10',
    specificMetrics: {
      shockCondition: 85,
      alignment: 92,
      rideHeight: 4.2
    },
    position3D: { x: -0.8, y: -0.2, z: 1.0 },
  },
  {
    id: 'suspension-fr',
    name: 'Front Right Suspension',
    type: 'suspension-fr',
    health: 89,
    distanceTraveled: 45000,
    temperature: { current: 92, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-05-10',
    nextServiceDue: '2025-05-10',
    specificMetrics: {
      shockCondition: 85,
      alignment: 92,
      rideHeight: 4.2
    },
    position3D: { x: 0.8, y: -0.2, z: 1.0 },
  },
  {
    id: 'suspension-rl',
    name: 'Rear Left Suspension',
    type: 'suspension-rl',
    health: 91,
    distanceTraveled: 45000,
    temperature: { current: 88, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-05-10',
    nextServiceDue: '2025-05-10',
    specificMetrics: {
      shockCondition: 88,
      alignment: 94,
      rideHeight: 4.3
    },
    position3D: { x: -0.8, y: -0.2, z: -1.0 },
  },
  {
    id: 'suspension-rr',
    name: 'Rear Right Suspension',
    type: 'suspension-rr',
    health: 91,
    distanceTraveled: 45000,
    temperature: { current: 90, min: 70, max: 120, unit: 'F' },
    status: 'normal',
    lastServiceDate: '2024-05-10',
    nextServiceDue: '2025-05-10',
    specificMetrics: {
      shockCondition: 88,
      alignment: 94,
      rideHeight: 4.3
    },
    position3D: { x: 0.8, y: -0.2, z: -1.0 },
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    componentId: 'brake-fl',
    severity: 'warning',
    message: 'Front Left Brake Pad Life: 35% remaining',
    timestamp: new Date().toISOString(),
    acknowledged: false,
  },
  {
    id: 'alert-2',
    componentId: 'brake-fr',
    severity: 'warning',
    message: 'Front Right Brake Pad Life: 40% remaining',
    timestamp: new Date().toISOString(),
    acknowledged: false,
  },
];

export const mockMaintenanceHistory: MaintenanceRecord[] = [
  {
    id: 'maint-1',
    componentId: 'engine-1',
    serviceType: 'Oil Change',
    date: '2024-10-15',
    mileage: 84200,
    cost: 55,
    notes: 'Synthetic oil, filter replaced',
  },
  {
    id: 'maint-2',
    componentId: 'tire-fl',
    serviceType: 'Tire Rotation',
    date: '2024-11-15',
    mileage: 84532,
    cost: 25,
  },
];

export const mockMaintenancePredictions: MaintenancePrediction[] = [
  {
    id: 'pred-1',
    componentId: 'engine-1',
    serviceType: 'Oil Change',
    predictedDate: '2025-01-15',
    predictedMileage: 85420,
    confidence: 95,
    estimatedCost: { min: 45, max: 65 },
  },
  {
    id: 'pred-2',
    componentId: 'brake-fl',
    serviceType: 'Brake Pad Replacement',
    predictedDate: '2025-02-20',
    predictedMileage: 88000,
    confidence: 78,
    estimatedCost: { min: 250, max: 400 },
  },
];

export const mockVehicleData: VehicleData = {
  health: {
    overallHealth: 94,
    components: mockComponents,
    lastScan: new Date().toISOString(),
  },
  alerts: mockAlerts,
  maintenanceHistory: mockMaintenanceHistory,
  maintenancePredictions: mockMaintenancePredictions,
  currentMileage: 84532,
  vin: '1HGBH41JXMN109186',
  model: '2023 Honda Accord',
  year: 2023,
};



