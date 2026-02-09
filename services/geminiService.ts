
import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

export const generateQuote = async (imageData: string, serviceType: string): Promise<Quote> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageData.split(',')[1],
            }
          },
          {
            text: `Act as a professional home improvement estimator for Pixie Fix. 
            Analyze this image for a ${serviceType} job. 
            Provide a realistic estimate, labor costs, material costs, and a timeline. 
            Keep it professional, transparent, and concise.`
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedCost: { type: Type.STRING },
          breakdown: {
            type: Type.OBJECT,
            properties: {
              labor: { type: Type.STRING },
              materials: { type: Type.STRING },
              timeline: { type: Type.STRING }
            },
            required: ["labor", "materials", "timeline"]
          },
          analysis: { type: Type.STRING }
        },
        required: ["estimatedCost", "breakdown", "analysis"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as Quote;
};
