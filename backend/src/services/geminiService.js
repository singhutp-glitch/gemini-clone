import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",

    contents: prompt,

    config: {
      systemInstruction: `
        You are a helpful AI assistant.
        Answer clearly and accurately.
        Keep responses under 50 words.
        but above 20
      `,

      maxOutputTokens: 150,

      temperature: 0.7,
      topP: 0.95,
    },
  });

  return response.text;
}