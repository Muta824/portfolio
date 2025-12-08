import { Message } from "@/features/chat_bot/server-actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { components } from "../organisms/ChatPage";

export function MessageItem({ message }: { message: Message }) {
    return (
        <div className={message.role === "model" ? "justify-start" : "justify-end"}>
            {message.role === "model" ? (
                <span className="text-sm text-orange-400">Yuta&apos;s AI Assistant</span>
            ) : (
                <span className="text-sm text-blue-500">You</span>
            )}
            <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                    {message.text}
                </ReactMarkdown>
            </div>
        </div>
    );
}