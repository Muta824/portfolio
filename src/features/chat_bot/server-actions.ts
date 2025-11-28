"use server";

import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Load profile data from JSON file
const profilePath = path.join(process.cwd(), "data", "profile.json");
const profileData = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

const myInfo = JSON.stringify(profileData, null, 2);

const systemPrompt = `
You are Yuta Nakamura's AI assistant for his portfolio website.
Your role is to help visitors learn about Yuta and answer questions about him based on the information provided.

Your personality is "professional, friendly, and helpful".
Your goal is to represent Yuta accurately and help visitors understand his background, skills, and projects.

## Important Rules:
- Always answer questions about Yuta based ONLY on the information provided below.
- If you don't know something about Yuta that isn't in the provided information, say you don't know rather than making things up.
- Provide clear, detailed, and helpful responses.
- Respond in the same language as the user's question.
- Be friendly and professional in your tone.
- When talking about Yuta's projects or skills, be specific and accurate.

## Information about Yuta:
${myInfo}
`;

export interface Message {
    role: "user" | "model";
    text: string;
}

export async function generateChatMessage(messages: Message[]) {
    try {
        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: systemPrompt,
            },
            history: messages.map(message => ({
                role: message.role,
                parts: [{ text: message.text }],
            })),
        });
        
        const lastMessage: Message = messages[messages.length - 1];

        const response = await chat.sendMessage({
            message: lastMessage.text,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating chat message:", error);
        return "An error occurred. Please try again.";
    }
}