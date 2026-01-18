import { ComponentData } from '../types/vehicle';

export function calculateOverallHealth(components: ComponentData[]): number {
  if (components.length === 0) return 100;
  
  const totalHealth = components.reduce((sum, comp) => sum + comp.health, 0);
  return Math.round(totalHealth / components.length);
}

export function getHealthStatus(health: number): 'excellent' | 'good' | 'warning' | 'critical' {
  if (health >= 90) return 'excellent';
  if (health >= 70) return 'good';
  if (health >= 50) return 'warning';
  return 'critical';
}

export function getHealthColor(health: number): string {
  const status = getHealthStatus(health);
  switch (status) {
    case 'excellent':
      return 'status-excellent';
    case 'good':
      return 'status-good';
    case 'warning':
      return 'status-warning';
    case 'critical':
      return 'status-critical';
  }
}



