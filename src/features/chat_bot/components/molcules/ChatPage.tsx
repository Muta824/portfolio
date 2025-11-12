"use client";

import { Spinner } from "@/components/atoms/Spinner";
import { generateChatMessage, Message } from "@/features/chat_bot/server-actions";
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
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            text: "Hello! I'm Yuta&apos;s AI assistant. You can ask me anything about Yuta.",
        },
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSendMessage = async () => {
        // if prompt is empty or generating, stop sending message process
        if (!prompt.trim() || isGenerating) return;
        
        // start sending message process
        setIsGenerating(true);
        
        // create new messages
        const newUserMessage: Message = {
            role: "user",
            text: prompt,
        };
        const newMessages: Message[] = [...messages, newUserMessage];
        
        // set new messages
        setMessages(newMessages);
        // clear prompt
        setPrompt("");

        // receive response from chatbot
        const response = await generateChatMessage(newMessages);
        // create new model message
        const newModelMessage: Message = {
            role: "model",
            text: response || "",
        };
        // add new model message to messages
        setMessages([...newMessages, newModelMessage]);
        
        // stop sending message process
        setIsGenerating(false);
    }

    // handle key down event for prompt input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // if enter key is pressed with ctrl key, send message
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div>
            <div className="border border-gray-300 rounded-md px-4 pt-5 mb-20">
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={`
                            ${message.role === "model" ? "justify-start" : "justify-end"}
                        `}
                    >
                        {message.role == "model" ? (
                            <span className="text-sm text-orange-400">Yuta&apos;s AI Assistant</span>
                        ) : (
                            <span className="text-sm text-blue-500">You</span>
                        )}
                        <div className="markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={components}
                            >
                                {message.text}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
                {isGenerating && <Spinner text="Thinking..." />}
            </div>

            {/* section for prompt input and sending message button */}
            <div className="flex items-center justify-center gap-2 mx-4 mb-8 fixed bottom-0 left-0 right-0">
                <input 
                    type="text" 
                    value={prompt} 
                    className="bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-2 w-3/4 disabled:cursor-not-allowed"
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your prompt... (Ctrl+Enter to send)"
                    disabled={isGenerating}
                />
                <button 
                    className="bg-blue-500 text-white rounded-md p-2 cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleSendMessage} 
                    disabled={isGenerating || !prompt}
                >
                    {isGenerating ? "Generating..." : "Generate"}
                </button>
            </div>
        </div>
    );
}