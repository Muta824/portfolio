"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function GoBackButton() {
    const router = useRouter();
    return (
        <button 
            onClick={() => router.back()}
            aria-label="Back to subscription searcher"
            className="flex items-center gap-1 px-2 py-1 w-fit text-blue-600 rounded-md mb-4 text-md cursor-pointer"
        >
            <ArrowLeftIcon className="w-4 h-4" /> back to subscription searcher
        </button>
    )
}