"use client";

import { useRef, useEffect, type RefObject } from "react";

const ROOT_MARGIN = "100px";
const THRESHOLD = 0;

interface UseInfiniteScrollOptions {
    enabled: boolean;
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
}

/**
 * Observes a sentinel element and invokes onLoadMore when it enters the viewport.
 * Pass scrollContainerRef to observe within a custom scroll container (e.g. overflow-auto layout).
 */
export function useInfiniteScroll(
    onLoadMore: () => void,
    options: UseInfiniteScrollOptions
): RefObject<HTMLDivElement | null> {
    const { enabled, root = null, rootMargin = ROOT_MARGIN, threshold = THRESHOLD } = options;
    const sentinelRef = useRef<HTMLDivElement>(null);
    const onLoadMoreRef = useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;

    useEffect(() => {
        if (!enabled) return;

        const el = sentinelRef.current;
        if (!el) return;

        const rootElement =
            root != null ? root : (el.closest("[data-scroll-container]") ?? undefined);

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0]?.isIntersecting) return;
                onLoadMoreRef.current();
            },
            { root: rootElement, rootMargin, threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [enabled, root, rootMargin, threshold]);

    return sentinelRef;
}
