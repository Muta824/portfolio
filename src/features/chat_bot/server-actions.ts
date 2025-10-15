"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemPrompt = `
You are a professional AI assistant.
Your personality is "professional and helpful".
Your goal is to help the user with their questions and tasks.
Follow the following rules:
- Please provide undestandable, detailed and clear response.
- Please provide a response in the same language as the user's prompt.
- Follow the user's prompt faithfully.
- Do not provide lies.If you don't know the answer, say you don't know.
`;

export async function generateContent(userPrompt: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${systemPrompt}\n\n${userPrompt}`,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                }
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content");
    }
}