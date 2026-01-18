import { useState } from 'react';
import TopStatusBar from './components/layout/TopStatusBar';
import BottomNavBar from './components/layout/BottomNavBar';
import SplitScreenLayout from './components/layout/SplitScreenLayout';
import HealthOverview from './components/dashboard/HealthOverview';
import Car3DViewer from './components/car3d/Car3DViewer';
import ComponentDetailPanel from './components/car3d/ComponentDetailPanel';
import VoiceAssistantCard from './components/cards/VoiceAssistantCard';
import CabinEnvironmentCard from './components/cards/CabinEnvironmentCard';
import SmartRecommendationsCard from './components/cards/SmartRecommendationsCard';
import DiagnosticsScreen from './components/screens/DiagnosticsScreen';
import MaintenanceScreen from './components/screens/MaintenanceScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import CriticalAlertOverlay from './components/alerts/CriticalAlertOverlay';
import AlertBadge from './components/alerts/AlertBadge';
import { useVehicleStore } from './store/vehicleStore';
import { ComponentData } from './types/vehicle';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const selectedComponent = useVehicleStore((state) => state.selectedComponent);
  const setSelectedComponent = useVehicleStore((state) => state.setSelectedComponent);
  const acknowledgeAlert = useVehicleStore((state) => state.acknowledgeAlert);
  const [acknowledgedCriticalAlert, setAcknowledgedCriticalAlert] = useState<string | null>(null);

  const handleComponentClick = (component: ComponentData) => {
    setSelectedComponent(component);
  };

  const handleClosePanel = () => {
    setSelectedComponent(null);
  };

  const criticalAlert = vehicleData.alerts.find(
    (a) => a.severity === 'critical' && !a.acknowledged && a.id !== acknowledgedCriticalAlert
  );

  const handleAcknowledgeCritical = () => {
    if (criticalAlert) {
      acknowledgeAlert(criticalAlert.id);
      setAcknowledgedCriticalAlert(criticalAlert.id);
    }
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <HealthOverview onComponentClick={handleComponentClick} />
            <Car3DViewer
              components={vehicleData.health.components}
              onComponentClick={handleComponentClick}
            />
          </>
        );
      case 'diagnostics':
        return <DiagnosticsScreen />;
      case 'history':
        return <MaintenanceScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {criticalAlert && (
        <CriticalAlertOverlay alert={criticalAlert} onAcknowledge={handleAcknowledgeCritical} />
      )}

      <TopStatusBar />
      
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' ? (
          <SplitScreenLayout
            leftPanel={
              <div className="h-full flex flex-col gap-4">
                <div className="flex-1">
                  <HealthOverview onComponentClick={handleComponentClick} />
                </div>
                <div className="h-[400px]">
                  <Car3DViewer
                    components={vehicleData.health.components}
                    onComponentClick={handleComponentClick}
                  />
                </div>
              </div>
            }
            rightPanel={
              <>
                <VoiceAssistantCard />
                <CabinEnvironmentCard />
                <SmartRecommendationsCard />
              </>
            }
          />
        ) : (
          <div className="h-full overflow-y-auto">{renderMainContent()}</div>
        )}
      </div>

      <ComponentDetailPanel component={selectedComponent} onClose={handleClosePanel} />
      
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;

