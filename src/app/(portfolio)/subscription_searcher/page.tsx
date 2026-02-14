"use client"

import { Input } from "@/components/atoms/Input";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Contents } from "@/features/subscription_searcher/components/molecules/Contents";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getContents } from "@/features/subscription_searcher/server-actions";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { Spinner } from "@/components/atoms/Spinner";
import type { TMDBContent } from "@/features/subscription_searcher/types/data";

export default function SubscriptionSearchPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [contents, setContents] = useState<TMDBContent[]>([]);
    const [inputValue, setInputValue] = useState(searchParams.get('q') ?? "");

    const query = searchParams.get('q')?.toString() ?? "";

    const updateUrl = useCallback((q: string) => {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        router.replace(`${pathname}?${params.toString()}`);
    }, [pathname, router]);

    const debouncedUpdateUrl = useDebouncedCallback(updateUrl, 300);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    useEffect(() => {
        const fetchContents = async () => {
            setIsLoading(true);
            const results = await getContents(query);
            setContents(results);
            setIsLoading(false);
        };
        fetchContents();
    }, [query]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <GoBackLink />
                <ThemeToggle />
            </div>
            <div className="pt-2 pb-4 mb-8">
                <Input 
                    type="text" 
                    placeholder="Search for your favorite movies and TV shows"
                    value={inputValue}
                    className="
                        text-center w-[75%] max-w-2xl text-lg px-6 py-4 mx-auto block
                        shadow-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-400 transition-all duration-200
                        placeholder:text-gray-500 dark:placeholder:text-gray-400
                    "
                    onChange={(e) => {
                        const v = e.target.value;
                        setInputValue(v);
                        debouncedUpdateUrl(v);
                    }}
                    aria-label="Search for your favorite movies and TV shows"
                />
            </div>

            {contents.length === 0 && query.trim() === "" && (
                <p className="h-full p-4 flex items-center justify-center text-center text-5xl text-gray-600 dark:text-gray-400 font-serif italic tracking-wide leading-relaxed">
                    Let&apos;s search for your favorite movies and TV shows!
                </p>
            )}
            
            {isLoading ? <Spinner /> : <Contents contents={contents} searchQuery={query} />}
        </div>
    )
}