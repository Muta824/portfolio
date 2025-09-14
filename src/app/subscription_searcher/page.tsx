"use client"

import { Input } from "@/components/atoms/Input";
import { Contents } from "@/features/subscription_searcher/components/molecules/Contents";
import Loading from "@/app/loading";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getContents } from "@/features/subscription_searcher/server-actions";
import { BackToHome } from "@/components/atoms/BackToHome";

export default function SubscriptionSearchPage() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [contents, setContents] = useState<any[]>([])

    const handleSearch = async (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
          params.set('q', query);
        } else {
          params.delete('q');
        }
        router.replace(`${pathname}?${params.toString()}`);
        setIsLoading(true)
        const contents = await getContents(query)
        setContents(contents)
        setIsLoading(false)
    }
    const debouncedHandleSearch = useDebouncedCallback(handleSearch, 300);

    useEffect(() => {
        handleSearch(searchParams.get('q')?.toString() || "");
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <BackToHome />
            <div className="pt-6 pb-4">
                <Input 
                    type="text" 
                    placeholder="Search"
                    className="text-center w-3/4 max-w-2xl text-lg px-6 py-4 mx-auto block shadow-lg border-2 border-gray-200 focus:border-blue-400 transition-all duration-200"
                    onChange={(e) => {
                        debouncedHandleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('q')?.toString() || ""}
                />
            </div>
            
            <div className="flex-1 flex items-center justify-center">
                {isLoading ? 
                    <Loading />
                : contents.length > 0 ?
                    <Contents contents={contents}/>
                : <h1 className="text-gray-600 text-5xl pb-10 font-serif italic tracking-wide leading-relaxed">
                    Let&apos;s search for your favorite movies and TV shows!
                </h1>
                }
            </div>
        </div>
    )
}