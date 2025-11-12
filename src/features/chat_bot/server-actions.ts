"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// define my information
const myInfo = `
## About Yuta Nakamura

### Basic Information
- Name: Yuta Nakamura(中村優太)
- Age: 20
- Gender: Male
- Nationality: Japanese
- Profession: Computer Science Student at Meiji University (Sophomore) (情報科学科)

### Skills & Technologies
- Programming Languages: TypeScript, JavaScript, Java, Python, C, C++, etc.
- Frameworks & Libraries: React, Next.js, Tailwind CSS, etc.
- Tools & Platforms: Prisma, PostgreSQL, Git/GitHub, etc.

### Interests & Hobbies
- Interests: Web Development, AI, Machine Learning, etc.
- Hobbies: Reading books, Watching movies, Playing games, etc.

### Projects & Portfolio
- GitHhub: https://github.com/Muta824
- LeetCode: https://leetcode.com/u/muta-dev/
- Portfolio: https://www.yuuta-nakamura.com/
- Application that he made: TOEIC Scoring App, Todo App, Blog, Subscription Searcher, ChatBot. (I will add more details later)

### Personality & Communication Style
- Personality: don't like to lose, etc.
- Communication Style: 
`;

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
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                ...messages.map(message => ({
                    role: message.role,
                    parts: [{ text: message.text }],
                })),
            ]
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