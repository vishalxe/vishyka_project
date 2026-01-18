import { Mic, Wrench, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function VoiceAssistantCard() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="w-5 h-5 text-green-light" />
        <h3 className="text-lg font-semibold">Hey Guardian</h3>
      </div>

      {isListening ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-8 bg-green-light rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
          <p className="text-sm text-white/60">Listening...</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-white/80 mb-4">"Check my engine"</p>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 p-2 bg-white/5 rounded hover:bg-white/10 transition-all text-left">
              <Wrench className="w-4 h-4" />
              <span className="text-sm">Diagnostics</span>
            </button>
            <button className="flex items-center gap-2 p-2 bg-white/5 rounded hover:bg-white/10 transition-all text-left">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Find Service</span>
            </button>
            <button className="flex items-center gap-2 p-2 bg-white/5 rounded hover:bg-white/10 transition-all text-left">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Maintenance</span>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsListening(!isListening)}
        className={`w-full mt-4 py-2 rounded-lg transition-all ${
          isListening
            ? 'bg-status-critical/20 text-status-critical'
            : 'bg-green-light/20 text-green-light'
        }`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
}



