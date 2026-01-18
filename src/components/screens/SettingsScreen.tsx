import { useState } from 'react';
import { useVehicleData } from '../../hooks/useVehicleData';

interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function Toggle({ label, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-all ${
          enabled ? 'bg-green-light' : 'bg-white/20'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsScreen() {
  const { vehicleData } = useVehicleData();
  const [settings, setSettings] = useState({
    criticalAlerts: true,
    maintenanceReminders: true,
    voiceAssistant: true,
    nearbyRecommendations: true,
    smokeDetection: true,
    airQualityMonitor: true,
    emotionAwareAssistant: true,
    predictiveMaintenance: true,
    locationSharing: true,
    usageAnalytics: true,
    voiceRecording: true,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
          <div className="space-y-0">
            <Toggle
              label="Critical Alerts"
              enabled={settings.criticalAlerts}
              onChange={(val) => updateSetting('criticalAlerts', val)}
            />
            <Toggle
              label="Maintenance Reminders"
              enabled={settings.maintenanceReminders}
              onChange={(val) => updateSetting('maintenanceReminders', val)}
            />
            <Toggle
              label="Voice Assistant"
              enabled={settings.voiceAssistant}
              onChange={(val) => updateSetting('voiceAssistant', val)}
            />
            <Toggle
              label="Nearby Recommendations"
              enabled={settings.nearbyRecommendations}
              onChange={(val) => updateSetting('nearbyRecommendations', val)}
            />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Smart Features</h2>
          <div className="space-y-0">
            <Toggle
              label="Smoke Detection"
              enabled={settings.smokeDetection}
              onChange={(val) => updateSetting('smokeDetection', val)}
            />
            <Toggle
              label="Air Quality Monitor"
              enabled={settings.airQualityMonitor}
              onChange={(val) => updateSetting('airQualityMonitor', val)}
            />
            <Toggle
              label="Emotion-Aware Assistant"
              enabled={settings.emotionAwareAssistant}
              onChange={(val) => updateSetting('emotionAwareAssistant', val)}
            />
            <Toggle
              label="Predictive Maintenance"
              enabled={settings.predictiveMaintenance}
              onChange={(val) => updateSetting('predictiveMaintenance', val)}
            />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Voice Assistant</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <span className="text-sm">Wake Word:</span>
              <span className="text-sm text-white/60">"Hey Guardian"</span>
              <button className="text-sm text-green-light hover:underline ml-4">Change</button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <span className="text-sm">Voice:</span>
              <span className="text-sm text-white/60">Female</span>
              <button className="text-sm text-green-light hover:underline ml-4">Change</button>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm">Response Length:</span>
              <span className="text-sm text-white/60">Brief</span>
              <button className="text-sm text-green-light hover:underline ml-4">Change</button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Privacy & Data</h2>
          <div className="space-y-0">
            <Toggle
              label="Location Sharing"
              enabled={settings.locationSharing}
              onChange={(val) => updateSetting('locationSharing', val)}
            />
            <Toggle
              label="Usage Analytics"
              enabled={settings.usageAnalytics}
              onChange={(val) => updateSetting('usageAnalytics', val)}
            />
            <Toggle
              label="Voice Recording"
              enabled={settings.voiceRecording}
              onChange={(val) => updateSetting('voiceRecording', val)}
            />
          </div>
          <button className="mt-4 text-sm text-green-light hover:underline">
            View Privacy Policy →
          </button>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Vehicle Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Model:</span>
              <span>{vehicleData.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">VIN:</span>
              <span className="font-mono">{vehicleData.vin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Current Mileage:</span>
              <span>{vehicleData.currentMileage.toLocaleString()} mi</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
            Reset to Defaults
          </button>
          <button className="flex-1 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
            About System
          </button>
        </div>
      </div>
    </div>
  );
}



