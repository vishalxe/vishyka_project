import { ComponentType } from '../types/vehicle';

export function getComponentDisplayName(type: ComponentType): string {
  const names: Record<ComponentType, string> = {
    engine: 'Engine',
    'brake-fl': 'Front Left Brake',
    'brake-fr': 'Front Right Brake',
    'brake-rl': 'Rear Left Brake',
    'brake-rr': 'Rear Right Brake',
    'tire-fl': 'Front Left Tire',
    'tire-fr': 'Front Right Tire',
    'tire-rl': 'Rear Left Tire',
    'tire-rr': 'Rear Right Tire',
    battery: 'Battery',
    transmission: 'Transmission',
    radiator: 'Radiator',
    'headlight-l': 'Left Headlight',
    'headlight-r': 'Right Headlight',
    exhaust: 'Exhaust System',
    'suspension-fl': 'Front Left Suspension',
    'suspension-fr': 'Front Right Suspension',
    'suspension-rl': 'Rear Left Suspension',
    'suspension-rr': 'Rear Right Suspension',
  };
  return names[type] || type;
}

export function getComponentIcon(type: ComponentType): string {
  const icons: Record<ComponentType, string> = {
    engine: '⚙️',
    'brake-fl': '🛑',
    'brake-fr': '🛑',
    'brake-rl': '🛑',
    'brake-rr': '🛑',
    'tire-fl': '⭕',
    'tire-fr': '⭕',
    'tire-rl': '⭕',
    'tire-rr': '⭕',
    battery: '🔋',
    transmission: '⚡',
    radiator: '🌡️',
    'headlight-l': '💡',
    'headlight-r': '💡',
    exhaust: '💨',
    'suspension-fl': '🔧',
    'suspension-fr': '🔧',
    'suspension-rl': '🔧',
    'suspension-rr': '🔧',
  };
  return icons[type] || '●';
}



