"use client";

import { generateContent } from "@/features/chat_bot/server-actions";
import { useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
    ul: ({ children }) => (
        <ul className="list-disc">
            {children}
        </ul>
    ),
}

export function ChatPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        const res = await generateContent(input);
        setInput("");
        setOutput(res || "");
        setIsGenerating(false);
    }

    return (
        <div>
            <div className="flex items-center justify-center gap-2 mb-8">
                <input 
                    type="text" 
                    value={input} 
                    className="border border-gray-300 rounded-md p-2 w-3/4 disabled:cursor-not-allowed"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your prompt..."
                    disabled={isGenerating}
                />
                <button 
                    className="bg-blue-500 text-white rounded-md p-2 cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                >
                    {isGenerating ? "Generating..." : "Generate"}
                </button>
            </div>
            <div className="markdown-content border border-gray-300 rounded-md p-4 m-4">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={components}
                >
                    {output}
                </ReactMarkdown>
            </div>
        </div>
    )
}