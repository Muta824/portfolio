"use client"

import { Input } from "@/components/atoms/Input";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Contents } from "@/features/subscription_searcher/components/molecules/Contents";
import Loading from "@/app/loading";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getContents } from "@/features/subscription_searcher/server-actions";
import { GoBackLink } from "@/components/atoms/GoBackLink";

export default function SubscriptionSearchPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [contents, setContents] = useState<any[]>([]);

    const handleSearch = async (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
          params.set('q', query);
        } else {
          params.delete('q');
        }
        router.replace(`${pathname}?${params.toString()}`);
        setIsLoading(true);
        const contents = await getContents(query);
        setContents(contents);
        setIsLoading(false);
    }
    const debouncedHandleSearch = useDebouncedCallback(handleSearch, 300);

    useEffect(() => {
        handleSearch(searchParams.get('q')?.toString() || "");
    }, [])

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <GoBackLink />
                <ThemeToggle />
            </div>
            <div className="pt-2 pb-4 mb-8">
                <Input 
                    type="text" 
                    placeholder="Search"
                    className="
                        text-center w-3/4 max-w-2xl text-lg px-6 py-4 mx-auto block
                        shadow-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-400 transition-all duration-200
                        placeholder:text-gray-500 dark:placeholder:text-gray-400
                    "
                    onChange={(e) => {
                        debouncedHandleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('q')?.toString() || ""}
                />
            </div>
            
            {isLoading ? 
                <Loading />
                : !searchParams.get('q') || searchParams.get('q')?.trim() === '' ?
                <p className="h-full p-4 flex items-center justify-center text-center text-5xl text-gray-600 font-serif italic tracking-wide leading-relaxed">
                    Let&apos;s search for your favorite movies and TV shows!
                </p>
                : contents.length === 0 ?
                <p className="h-full p-4 flex items-center justify-center text-center text-5xl text-gray-600 font-serif italic tracking-wide leading-relaxed">
                    No results found
                </p>
                :
                <Contents contents={contents}/>
            }
        </div>
    )
}