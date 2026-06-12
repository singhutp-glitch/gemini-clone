import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponseStream(contents) {
  const stream = await ai.models.generateContentStream({
    model: "gemini-3.1-flash-lite",

    contents,

    config: {
      systemInstruction: `
        You are a helpful AI assistant.
        Answer clearly and accurately.
      `,

      maxOutputTokens: 1000,

      temperature: 1,
      topP: 0.95,
    },
  });

  return stream;
}