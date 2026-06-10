import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: prompt,

    config: {
      systemInstruction: `
        You are a helpful AI assistant.
        Answer clearly and accurately.
        Keep responses under 50 words.
      `,

      maxOutputTokens: 50,

      temperature: 0.7,
      topP: 0.95,
    },
  });

  return response.text;
}