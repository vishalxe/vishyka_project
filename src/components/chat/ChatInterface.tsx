import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Mic, MicOff } from 'lucide-react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { aiService, ChatMessage } from '../../services/aiService';
import { useVehicleStore } from '../../store/vehicleStore';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const vehicleData = useVehicleStore((state) => state.vehicleData);

  const { speak, stop: stopSpeaking, isSpeaking } = useTextToSpeech({
    rate: 0.9,
    pitch: 1.1,
  });

  const { isListening, startListening, stopListening, isSupported: voiceSupported } = useVoiceRecognition({
    onResult: (transcript) => {
      setInput(transcript);
      handleSend(transcript);
    },
    onError: (error) => {
      console.error('Voice recognition error:', error);
    },
  });

  useEffect(() => {
    if (isOpen) {
      // Load conversation history
      const history = aiService.getHistory();
      setMessages(history.filter(msg => msg.role !== 'assistant' || msg.content !== history[0]?.content));
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isProcessing) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await aiService.chat(text, vehicleData);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Speak the response
      speak(response);
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: error?.message || "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      stopSpeaking();
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  const chatContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <div 
        className="glass-strong rounded-2xl w-full max-w-2xl h-[85vh] max-h-[800px] flex flex-col shadow-2xl border border-white/20 relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 10000 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Guardian AI Assistant</h2>
              <p className="text-sm text-white/60">Your vehicle health companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="touch-target flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {messages.length === 0 && (
            <div className="text-center text-white/70 py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👋</span>
              </div>
              <p className="text-xl font-semibold mb-2 text-white">Hello! I'm Guardian</p>
              <p className="text-sm text-white/60">Ask me about your vehicle's health, maintenance, or any dashboard features.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/20 text-white border border-green-500/40'
                    : 'glass text-white/95 border border-white/10'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                <p className="text-xs text-white/40 mt-2">
                  {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start animate-fade-in">
              <div className="glass rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-xs text-white/60 ml-2">Guardian is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10 flex-shrink-0 bg-slate-900/50">
          <div className="flex gap-3 mb-3">
            {voiceSupported && (
              <button
                onClick={handleVoiceToggle}
                className={`touch-target flex items-center justify-center p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-status-critical/30 text-status-critical border-2 border-status-critical/50 shadow-lg shadow-status-critical/20'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={isListening ? 'Listening...' : 'Type your message or press Enter...'}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all disabled:opacity-50"
              disabled={isProcessing || isListening}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isProcessing || isListening}
              className="button-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] justify-center"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {isListening && (
            <div className="flex items-center gap-2 text-status-critical text-sm font-medium px-1">
              <div className="w-2.5 h-2.5 bg-status-critical rounded-full animate-pulse" />
              <span>Listening... Speak your question now</span>
            </div>
          )}
          {isSpeaking && (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium px-1 mt-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span>Speaking response...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render using portal to ensure it's above everything
  return createPortal(chatContent, document.body);
}

