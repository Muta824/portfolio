"use client";

import { Spinner } from "@/components/atoms/Spinner";
import { generateChatMessage, Message } from "@/features/chat_bot/server-actions";
import { useEffect, useRef, useState } from "react";
import { Components } from "react-markdown";
import { MessageItem } from "../molecules/MessageItem";

export const components: Components = {
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
    const [isSending, setIsSending] = useState(false);
    const promptInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // when user message is added, scroll to the last message
    // when not sending message, focus on prompt input
    useEffect(() => {
        if (isSending) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            promptInputRef.current?.focus();
        }
    }, [isSending]);

    const handleSendMessage = async () => {
        // if prompt is empty or generating, stop sending message process
        if (!prompt.trim() || isSending) return;
        
        // start sending message process
        setIsSending(true);

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
        setIsSending(false);
    }

    // if enter key is pressed with ctrl key, send message
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // calculate if there is a user message and the index of the last user message
    const hasUserMessage = messages.some(m => m.role === "user");
    const lastUserIndex = messages.map(m => m.role).lastIndexOf("user");

    // calculate old messages and last exchange
    const oldMessages = hasUserMessage ? messages.slice(0, lastUserIndex) : messages;
    const lastExchange = hasUserMessage ? messages.slice(lastUserIndex) : [];

    return (
        <div>
            <div className="overflow-y-auto border border-gray-300 rounded-md px-4 pt-5 mb-20">
                {/* old messages */}
                {oldMessages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))}

                {/* last exchange (user + assistant) in a box with the screen height */}
                {lastExchange.length > 0 && (
                    <div className="min-h-[calc(100vh-120px)]">
                        {/* anchor for scroll position */}
                        <div ref={messagesEndRef} />
                        {lastExchange.map((message, index) => (
                            <MessageItem key={index} message={message} />
                        ))}
                        {isSending && <Spinner text="Thinking..." />}
                    </div>
                )}
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
                    disabled={isSending}
                    ref={promptInputRef}
                />
                <button 
                    className="bg-blue-500 text-white rounded-md p-2 cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleSendMessage} 
                    disabled={isSending || !prompt}
                >
                    {isSending ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}