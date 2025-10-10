"use client"

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBackButton = ({ href = "" }: { href?: string }) => {
    const router = useRouter();
    
    return (
        <button 
            onClick={() => router.back()} 
            className="flex items-center gap-1 px-2 py-1 w-fit text-blue-600 rounded-md mb-4 text-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            <ArrowLeftIcon className="w-4 h-4" /> back to {href || "home"}
        </button>
    )
}