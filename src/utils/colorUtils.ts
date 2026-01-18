import { ComponentStatus } from '../types/vehicle';

export function getStatusColor(status: ComponentStatus): string {
  switch (status) {
    case 'normal':
      return 'status-excellent';
    case 'warning':
      return 'status-warning';
    case 'critical':
      return 'status-critical';
  }
}

export function getStatusBgColor(status: ComponentStatus): string {
  switch (status) {
    case 'normal':
      return 'bg-status-excellent/20';
    case 'warning':
      return 'bg-status-warning/20';
    case 'critical':
      return 'bg-status-critical/20';
  }
}

export function getStatusDotColor(status: ComponentStatus): string {
  switch (status) {
    case 'normal':
      return 'bg-status-excellent';
    case 'warning':
      return 'bg-status-warning';
    case 'critical':
      return 'bg-status-critical';
  }
}



