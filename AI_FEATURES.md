# AI Voice & Chat Assistant Features

## Overview
The dashboard now includes a fully functional AI voice and chat assistant powered by Google's Gemini AI.

## Features Implemented

### 1. **Voice Recognition**
- Uses Web Speech API for real-time voice input
- Supports continuous listening mode
- Visual feedback with animated waveform
- Browser compatibility check

### 2. **Text-to-Speech**
- AI responses are automatically spoken
- Configurable pitch, rate, and volume
- Natural-sounding voice output

### 3. **Chat Interface**
- Full-featured chat UI with message history
- Real-time AI responses
- Voice input support in chat
- Conversation history maintained

### 4. **AI Integration**
- Powered by Google Gemini Pro
- Context-aware responses about vehicle health
- Understands vehicle-specific queries
- Provides actionable advice

## Usage

### Voice Assistant Card
1. Click "🎤 Voice" button to start voice recognition
2. Speak your question (e.g., "Check my engine", "What's my vehicle health?")
3. AI responds both visually and audibly
4. Click "Chat" button to open full chat interface

### Chat Interface
1. Click "Chat" button in Voice Assistant Card
2. Type or use voice input
3. Ask questions about:
   - Vehicle health status
   - Component details (engine, brakes, tires, etc.)
   - Maintenance schedules
   - Dashboard features

### Quick Actions
- Click quick action buttons (Diagnostics, Find Service, Maintenance)
- AI provides contextual information about each feature

## Example Queries

- "What's my vehicle health score?"
- "Check my engine status"
- "When is my next maintenance due?"
- "Tell me about my brakes"
- "What alerts do I have?"
- "How many miles until my next service?"

## API Configuration

The API key is configured in `src/services/aiService.ts`. For production, use environment variables:

```env
VITE_GOOGLE_AI_API_KEY=your_api_key_here
```

## Technical Details

### Components
- `VoiceAssistantCard.tsx` - Main voice assistant UI
- `ChatInterface.tsx` - Full chat interface
- `aiService.ts` - AI service integration
- `useVoiceRecognition.ts` - Voice recognition hook
- `useTextToSpeech.ts` - Text-to-speech hook

### Browser Support
- Voice recognition: Chrome, Edge, Safari (WebKit)
- Text-to-speech: All modern browsers
- Chat: All browsers

## Future Enhancements
- Multi-language support
- Voice command shortcuts
- Integration with vehicle controls
- Predictive maintenance suggestions
- Natural language navigation

