# vishyka_project

# AI Vehicle Health System - Infotainment Dashboard

A modern, automotive-grade infotainment dashboard for real-time vehicle health monitoring with interactive 3D car visualization.

## Features

- **Real-time Vehicle Health Monitoring**: Comprehensive health scores and status for all vehicle components
- **Interactive 3D Car Model**: Rotate and explore your vehicle in 3D, click on components to view detailed metrics
- **Component-Specific Metrics**: View health, distance traveled, temperature ranges, and component-specific data
- **Smart Alerts**: Color-coded alerts for components needing attention
- **Voice Assistant UI**: Visual interface for voice commands (UI ready for integration)
- **Maintenance Predictions**: AI-powered maintenance scheduling
- **Automotive-Grade Design**: Optimized for 10-15 inch touchscreen displays

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Three Fiber** for 3D graphics
- **Zustand** for state management
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── layout/          # TopStatusBar, BottomNavBar, SplitScreenLayout
│   ├── dashboard/       # HealthOverview, HealthGauge, SystemStatusGrid
│   ├── car3d/          # 3D car viewer and components
│   ├── cards/          # Contextual cards (Voice, Environment, Recommendations)
│   └── screens/        # Full-screen views (Diagnostics, Maintenance, etc.)
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript interfaces
├── data/               # Mock vehicle data
└── utils/              # Utility functions
```

## 3D Car Model

Currently using placeholder geometry. The GLB model integration (`toyota_supra_a90_3d_printeble_model.glb`) is planned for Phase 2.

To integrate the GLB model:
1. Place the model file at `/public/models/toyota_supra_a90.glb`
2. Update `src/components/car3d/CarModel.tsx` to load the GLB file using `useGLTF`
3. Map GLB mesh parts to component IDs in `componentMapping.ts`

## Component Status Colors

- 🟢 **Green (90-100%)**: Excellent - No issues
- 🟡 **Yellow (70-89%)**: Good - Monitor closely
- 🟠 **Orange (50-69%)**: Attention Needed - Service soon
- 🔴 **Red (<50%)**: Critical - Immediate action required

## Development Notes

- Touch targets are minimum 60px for automotive use
- Animations are disabled during "driving" mode (can be toggled)
- All components are optimized for 1280x720 and 1920x1080 resolutions
- Color scheme uses green gradient theme matching automotive design guidelines

## License

MIT



