import { Mic, Wrench, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { aiService } from '../../services/aiService';
import { useVehicleStore } from '../../store/vehicleStore';
import ChatInterface from '../chat/ChatInterface';

export default function VoiceAssistantCard() {
  const [isListening, setIsListening] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const [lastResponse, setLastResponse] = useState('');

  const { speak, stop: stopSpeaking } = useTextToSpeech({
    rate: 0.9,
    pitch: 1.1,
  });

  const { isListening: voiceListening, startListening, stopListening, isSupported: voiceSupported } = useVoiceRecognition({
    onResult: async (transcript) => {
      setIsListening(false);
      try {
        const response = await aiService.chat(transcript, vehicleData);
        setLastResponse(response);
        speak(response);
      } catch (error) {
        console.error('AI error:', error);
        speak("I'm sorry, I encountered an error. Please try again.");
      }
    },
    onError: (error) => {
      console.error('Voice recognition error:', error);
      setIsListening(false);
    },
  });

  const handleQuickAction = async (action: string) => {
    try {
      const response = await aiService.chat(`Tell me about ${action}`, vehicleData);
      setLastResponse(response);
      speak(response);
    } catch (error) {
      console.error('AI error:', error);
    }
  };

  return (
    <div className="glass rounded-2xl p-5 card-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
          <Mic className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Hey Guardian</h3>
      </div>

      {voiceListening ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-8 bg-status-critical rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
          <p className="text-sm text-status-critical font-semibold">Listening...</p>
          <p className="text-xs text-white/60">Speak your question</p>
        </div>
      ) : lastResponse ? (
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-sm text-white/90">{lastResponse}</p>
          </div>
          <button
            onClick={() => setLastResponse('')}
            className="text-xs text-white/60 hover:text-white/80"
          >
            Clear
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-white/80 mb-4">Try saying: "Check my engine" or "What's my vehicle health?"</p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleQuickAction('diagnostics')}
              className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-left"
            >
              <Wrench className="w-4 h-4" />
              <span className="text-sm">Diagnostics</span>
            </button>
            <button 
              onClick={() => handleQuickAction('find service')}
              className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-left"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Find Service</span>
            </button>
            <button 
              onClick={() => handleQuickAction('maintenance')}
              className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-left"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Maintenance</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        {voiceSupported && (
          <button
            onClick={() => {
              if (voiceListening) {
                stopListening();
                stopSpeaking();
                setIsListening(false);
              } else {
                startListening();
                setIsListening(true);
              }
            }}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              voiceListening
                ? 'bg-status-critical/20 text-status-critical border border-status-critical/30'
                : 'button-primary'
            }`}
          >
            {voiceListening ? 'Stop' : '🎤 Voice'}
          </button>
        )}
        <button
          onClick={() => setIsChatOpen(true)}
          className="button-secondary flex-1 flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </button>
      </div>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}



