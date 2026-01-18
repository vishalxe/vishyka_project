import { GoogleGenerativeAI } from '@google/generative-ai';
import { VehicleData } from '../types/vehicle';

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY || 'AIzaSyBmLhIMfoC13AYGdAVR8BqRM2JPMupbej8';

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.warn('Google AI API key not configured properly');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class AIService {
  private model: any;
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    // Initialize model - try different model names
    try {
      this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    } catch (error) {
      console.warn('Failed to load gemini-pro, trying gemini-1.5-pro:', error);
      try {
        this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      } catch (fallbackError) {
        console.error('Failed to initialize AI model:', fallbackError);
        // Model will be null, but we'll handle it in the chat method
      }
    }
    this.initializeSystemPrompt();
  }

  private initializeSystemPrompt() {
    this.conversationHistory.push({
      role: 'assistant',
      content: `You are Guardian, a friendly and helpful AI assistant for a vehicle health monitoring dashboard. 
      You help users understand their vehicle's health, maintenance needs, and provide guidance on vehicle care.
      Be conversational, friendly, and concise. Always provide helpful information about vehicle components, 
      health scores, maintenance schedules, and answer questions about the dashboard features.
      When asked about specific components (engine, brakes, tires, battery, transmission, etc.), provide relevant information.
      For health scores: 90-100% is excellent, 70-89% is good, 50-69% needs attention, below 50% is critical.
      Keep responses brief (2-3 sentences max) and actionable. Use emojis sparingly.`,
      timestamp: new Date(),
    });
  }

  async chat(userMessage: string, vehicleData?: VehicleData): Promise<string> {
    try {
      if (!this.model) {
        throw new Error('AI model not initialized');
      }

      // Add vehicle context to the prompt
      let systemContext = '';
      
      if (vehicleData) {
        const activeAlerts = vehicleData.alerts.filter(a => !a.acknowledged);
        const components = vehicleData.health.components;
        
        // Build component summary (limit to avoid token limits)
        const componentSummary = components.slice(0, 10).map(c => 
          `${c.name}: ${c.health}% health, ${c.status} status`
        ).join('\n');
        
        systemContext = `Vehicle Information:
- Model: ${vehicleData.model} (${vehicleData.year})
- Overall Health: ${vehicleData.health.overallHealth}%
- Current Mileage: ${vehicleData.currentMileage.toLocaleString()} miles
- Active Alerts: ${activeAlerts.length}${activeAlerts.length > 0 ? ` - ${activeAlerts[0].message}` : ''}
- Next Maintenance: ${vehicleData.maintenancePredictions[0]?.serviceType || 'None scheduled'}${vehicleData.maintenancePredictions[0] ? ` in ${Math.ceil((new Date(vehicleData.maintenancePredictions[0].predictedDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days` : ''}

Key Components:
${componentSummary}

`;
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      });

      // Build prompt with system context and recent conversation
      const recentHistory = this.conversationHistory.slice(-6); // Last 6 messages for context
      const conversationText = recentHistory
        .map(msg => {
          if (msg.role === 'user') {
            return `User: ${msg.content}`;
          } else {
            return `Guardian: ${msg.content}`;
          }
        })
        .join('\n');

      const fullPrompt = `${systemContext}${conversationText}\nGuardian:`;

      // Generate response with timeout
      console.log('Sending request to AI with prompt length:', fullPrompt.length);
      
      const generatePromise = this.model.generateContent(fullPrompt);

      const result = await Promise.race([
        generatePromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 30000)
        )
      ]) as any;

      console.log('AI response received:', result);
      
      const response = result.response;
      const text = response.text().trim();
      
      console.log('AI response text:', text);

      if (!text) {
        throw new Error('Empty response from AI');
      }

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      });

      return text;
    } catch (error: any) {
      console.error('AI Service Error:', error);
      
      // More specific error messages
      if (error.message?.includes('API_KEY')) {
        return "I'm having trouble authenticating. Please check the API configuration.";
      } else if (error.message?.includes('timeout')) {
        return "The request took too long. Please try again with a shorter question.";
      } else if (error.message?.includes('quota') || error.message?.includes('429')) {
        return "I've reached my usage limit. Please try again later.";
      } else if (error.message?.includes('403') || error.message?.includes('permission')) {
        return "I don't have permission to access the AI service. Please check the API key.";
      }
      
      return `I'm sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again.`;
    }
  }

  clearHistory() {
    this.conversationHistory = [];
    this.initializeSystemPrompt();
  }

  getHistory(): ChatMessage[] {
    return this.conversationHistory;
  }
}

export const aiService = new AIService();

