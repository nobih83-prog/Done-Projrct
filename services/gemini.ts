
import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "Luxury Concierge", an AI assistant for Luxury BD, a premium e-commerce store in Bangladesh.
Your goal is to help customers find high-end products.
Be polite, professional, and knowledgeable.
The user might ask in English or Bengali. Respond in the same language.
Here is our current inventory:
${JSON.stringify(PRODUCTS)}

When recommending products:
1. Mention specific prices (in BDT).
2. Highlight why they are "luxury".
3. If they ask for something we don't have, politely suggest the closest alternative from our inventory.
4. Keep responses concise but elegant.
`;

export class GeminiService {
  private chat: Chat;

  constructor() {
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  async sendMessage(message: string) {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while connecting to our concierge. Please try again.";
    }
  }
}

export const geminiService = new GeminiService();
