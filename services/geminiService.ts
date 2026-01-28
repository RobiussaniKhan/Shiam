
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorOptions } from "../types";
import { CATEGORIES } from "../constants";

export const generateCaptions = async (options: GeneratorOptions): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const categoryData = CATEGORIES.find(c => c.id === options.category);
  
  const systemInstruction = `
    You are a professional social media content creator and creative writer.
    Your task is to generate 5 high-quality, human-like social media captions.
    
    Category: ${options.category}
    Tone: ${options.tone}
    Language: ${options.language}
    Context/Input: ${options.context || 'General'}
    
    Guidelines:
    - ${categoryData?.promptGuidance}
    - Avoid generic "robotic" clichés.
    - If language is 'Bangla', use natural Bengali script.
    - If language is 'Banglish', write Bengali words using the Roman (English) alphabet as people chat on social media.
    - Include relevant emojis.
    - If the tone is 'poetic', use metaphors.
    - If 'short', keep it under 10 words. If 'long', make it 2-3 sentences.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 creative captions for the following: ${options.context || 'General category ' + options.category}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of 5 generated captions"
            }
          },
          required: ["captions"]
        }
      }
    });

    const result = JSON.parse(response.text || '{"captions": []}');
    return result.captions;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate captions. Please try again.");
  }
};
