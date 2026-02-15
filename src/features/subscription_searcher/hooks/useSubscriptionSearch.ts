"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getContents } from "../server-actions";
import type { TMDBContent } from "../types/data";

const DEBOUNCE_MS = 300;

export function useSubscriptionSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const query = searchParams.get("q")?.toString() ?? "";
    const [inputValue, setInputValue] = useState(query);

    const [contents, setContents] = useState<TMDBContent[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const requestIdRef = useRef(0);
    const loadMoreLockRef = useRef(false);

    const updateUrl = useCallback(
        (q: string) => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            router.replace(`${pathname}?${params.toString()}`);
        },
        [pathname, router]
    );

    const debouncedUpdateUrl = useDebouncedCallback(updateUrl, DEBOUNCE_MS);

    const handleInputChange = useCallback(
        (value: string) => {
            setInputValue(value);
            debouncedUpdateUrl(value);
        },
        [debouncedUpdateUrl]
    );

    // Sync input from URL (e.g. browser back/forward) and fetch when query changes
    useEffect(() => {
        setInputValue(query);

        if (query.trim() === "") {
            setContents([]);
            setTotalPages(0);
            setCurrentPage(1);
            setError(null);
            return;
        }

        const id = ++requestIdRef.current;

        const fetchContents = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { results, totalPages: pages } = await getContents(query, 1);
                if (id !== requestIdRef.current) return; // Stale request, discard
                setContents(results);
                setTotalPages(pages);
                setCurrentPage(1);
            } catch (err) {
                if (id !== requestIdRef.current) return;
                setError(err instanceof Error ? err.message : "Failed to fetch");
                setContents([]);
            } finally {
                if (id === requestIdRef.current) setIsLoading(false);
            }
        };

        fetchContents();
    }, [query]);

    const handleLoadMore = useCallback(async () => {
        if (loadMoreLockRef.current || currentPage >= totalPages || !query.trim()) return;

        loadMoreLockRef.current = true;
        setIsLoadingMore(true);
        setError(null);

        const nextPage = currentPage + 1;
        try {
            const { results, totalPages: pages } = await getContents(query, nextPage);
            setContents((prev) => [...prev, ...results]);
            setTotalPages(pages);
            setCurrentPage(nextPage);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load more");
        } finally {
            setIsLoadingMore(false);
            loadMoreLockRef.current = false;
        }
    }, [query, currentPage, totalPages]);

    return {
        query,
        inputValue,
        handleInputChange,
        contents,
        isLoading,
        isLoadingMore,
        error,
        hasNextPage: currentPage < totalPages,
        handleLoadMore,
    };
}
