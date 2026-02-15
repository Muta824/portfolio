"use client";

import { Input } from "@/components/atoms/Input";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Contents } from "@/features/subscription_searcher/components/molecules/Contents";
import { ContentCardSkeleton } from "@/features/subscription_searcher/components/atoms/ContentCardSkeleton";
import { TrendingHero } from "@/features/subscription_searcher/components/molecules/TrendingHero";
import { TrendingRow } from "@/features/subscription_searcher/components/molecules/TrendingRow";
import { useSubscriptionSearch } from "@/features/subscription_searcher/hooks/useSubscriptionSearch";
import { useInfiniteScroll } from "@/features/subscription_searcher/hooks/useInfiniteScroll";
import type { TMDBContent } from "@/features/subscription_searcher/types/data";

const SKELETON_COUNT = 10;
const LOAD_MORE_SKELETON_COUNT = 6;

export function SubscriptionSearchClient({
    initialTrendingMovies,
    initialTrendingTV,
}: {
    initialTrendingMovies: TMDBContent[];
    initialTrendingTV: TMDBContent[];
}) {
    const {
        query,
        inputValue,
        handleInputChange,
        contents,
        isLoading,
        isLoadingMore,
        error,
        hasNextPage,
        handleLoadMore,
    } = useSubscriptionSearch();

    const sentinelRef = useInfiniteScroll(handleLoadMore, {
        enabled: hasNextPage && !isLoadingMore && contents.length > 0 && query.trim() !== "",
    });

    const showTrending = query.trim() === "";
    const hasDiscoverContent =
        initialTrendingMovies.length > 0 || initialTrendingTV.length > 0;

    const heroMovie =
        initialTrendingMovies.length > 0 ? initialTrendingMovies[0] : null;
    const hasHeroImage = heroMovie?.backdrop_path ?? heroMovie?.poster_path;
    const moviesForRow =
        hasHeroImage && initialTrendingMovies.length > 1
            ? initialTrendingMovies.slice(1)
            : initialTrendingMovies;

    return (
        <div className="flex flex-col h-full">
            <header className="z-10 bg-white dark:bg-gray-900 -mx-3 -mt-4 px-3 py-4 sm:-mx-4 sm:-mt-4 sm:px-4 sm:py-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <GoBackLink />
                    <ThemeToggle />
                </div>
                <div className="pt-2 pb-2">
                    <Input
                        type="text"
                        placeholder="Search for your favorite movies and TV shows"
                        value={inputValue}
                        className="
                            text-base sm:text-lg text-center w-full max-w-2xl px-4 py-3 sm:px-6 sm:py-4 mx-auto block
                            shadow-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-400 transition-all duration-200
                            placeholder:text-gray-500 dark:placeholder:text-gray-400
                        "
                        onChange={(e) => handleInputChange(e.target.value)}
                        aria-label="Search for your favorite movies and TV shows"
                    />
                </div>
            </header>

            {showTrending && !hasDiscoverContent && (
                <p className="flex-1 p-4 flex items-center justify-center text-center text-2xl sm:text-5xl text-gray-600 dark:text-gray-400 font-serif italic tracking-wide leading-relaxed">
                    Let&apos;s search for your favorite movies and TV shows!
                </p>
            )}

            {showTrending && hasDiscoverContent && (
                <>
                    {heroMovie && hasHeroImage && (
                        <TrendingHero content={heroMovie} />
                    )}
                    {moviesForRow.length > 0 && (
                        <TrendingRow
                            title="今週人気の映画"
                            contents={moviesForRow}
                        />
                    )}
                    {initialTrendingTV.length > 0 && (
                        <TrendingRow
                            title="今週人気のドラマ"
                            contents={initialTrendingTV}
                        />
                    )}
                </>
            )}

            {isLoading && query.trim() !== "" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 w-full">
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <ContentCardSkeleton key={`skeleton-${i}`} />
                    ))}
                </div>
            )}

            {error && (
                <p className="p-4 text-center text-red-500 dark:text-red-400" role="alert">
                    {error}
                </p>
            )}

            {!showTrending && !isLoading && (contents.length > 0 || query.trim() !== "") && (
                <>
                    <Contents contents={contents} searchQuery={query} />
                    {hasNextPage && (
                        <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />
                    )}
                    {isLoadingMore && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 w-full mt-4">
                            {Array.from({ length: LOAD_MORE_SKELETON_COUNT }).map((_, i) => (
                                <ContentCardSkeleton key={`load-more-${i}`} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
