"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const systemPrompt = `
関西弁で話してください。
`;

export async function generateContent(userPrompt: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemPrompt}\n\n${userPrompt}`,
    });
    return response.text;
}