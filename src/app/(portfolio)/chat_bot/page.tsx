import { ChatPage } from "@/features/chat_bot/components/molecules/ChatPage";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

export default function Page() {
    return (
        <div className="relative">
            <div className="flex justify-between items-center">
                <GoBackLink />
                <ThemeToggle />
            </div>
            <h1 className="text-center text-4xl font-bold mb-8">ChatBot</h1>
            <ChatPage />
        </div>
    )
}