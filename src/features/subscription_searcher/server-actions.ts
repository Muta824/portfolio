"use server"

import { unstable_cache } from "next/cache";
import type { TMDBContent, TMDBDetailContent, TMDBWatchProvider } from "./types/data";

const TMDB_BASE = "https://api.themoviedb.org/3";

function getTmdbHeaders(): HeadersInit {
    return {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    };
}

async function fetchTmdb<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${TMDB_BASE}${path}`, {
            method: "GET",
            headers: getTmdbHeaders(),
        });
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`);
        }
        return (await res.json()) as T;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchTmdbOrThrow<T>(path: string): Promise<T> {
    const res = await fetch(`${TMDB_BASE}${path}`, {
        method: "GET",
        headers: getTmdbHeaders(),
    });
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    return (await res.json()) as T;
}

export interface GetContentsResult {
    results: TMDBContent[];
    totalPages: number;
    totalResults: number;
}

export async function getTrendingMovies(): Promise<TMDBContent[]> {
    const fetchTrending = async () => {
        try {
            const data = await fetchTmdb<{
                results?: Array<{
                    id: number;
                    poster_path: string | null;
                    backdrop_path: string | null;
                    title?: string;
                    original_title?: string;
                    overview?: string;
                    release_date?: string;
                    vote_average?: number;
                }>;
            }>("/trending/movie/week?language=ja-JP");
            if (!data?.results) return [];
            return data.results.map((item) => ({
                id: item.id,
                media_type: "movie" as const,
                poster_path: item.poster_path ?? null,
                backdrop_path: item.backdrop_path ?? null,
                title: item.title,
                original_title: item.original_title,
                overview: item.overview,
                release_date: item.release_date,
                vote_average: item.vote_average,
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    return unstable_cache(fetchTrending, ["tmdb-trending-movies"], {
        revalidate: 3600,
    })();
}

export async function getTrendingTV(): Promise<TMDBContent[]> {
    const fetchTrending = async () => {
        try {
            const data = await fetchTmdb<{
                results?: Array<{
                    id: number;
                    poster_path: string | null;
                    backdrop_path: string | null;
                    name?: string;
                    original_name?: string;
                    overview?: string;
                    first_air_date?: string;
                    vote_average?: number;
                }>;
            }>("/trending/tv/week?language=ja-JP");
            if (!data?.results) return [];
            return data.results.map((item) => ({
                id: item.id,
                media_type: "tv" as const,
                poster_path: item.poster_path ?? null,
                backdrop_path: item.backdrop_path ?? null,
                name: item.name,
                original_name: item.original_name,
                overview: item.overview,
                first_air_date: item.first_air_date,
                vote_average: item.vote_average,
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    return unstable_cache(fetchTrending, ["tmdb-trending-tv"], {
        revalidate: 3600,
    })();
}

export async function getContents(query: string, page = 1): Promise<GetContentsResult> {
    const fetchContents = async () => {
        try {
            const path = `/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=ja-JP&page=${page}`;
            const data = await fetchTmdbOrThrow<{
                results: TMDBContent[];
                total_pages: number;
                total_results: number;
            }>(path);
            const filteredResults = data.results.filter(
                (result) => result.media_type === "movie" || result.media_type === "tv"
            );
            return {
                results: filteredResults,
                totalPages: data.total_pages,
                totalResults: data.total_results,
            };
        } catch (error) {
            console.error(error);
            return { results: [], totalPages: 0, totalResults: 0 };
        }
    };
    return unstable_cache(fetchContents, ["tmdb-contents", query, String(page)], {
        revalidate: 3600,
    })();
}

export async function getTvDetails(series_id: number): Promise<TMDBDetailContent | null> {
    const fetchDetails = () => fetchTmdb<TMDBDetailContent>(`/tv/${series_id}`);
    return unstable_cache(fetchDetails, ["tmdb-tv-details", String(series_id)], {
        revalidate: 86400,
    })();
}

export async function getMovieDetails(movie_id: number): Promise<TMDBDetailContent | null> {
    const fetchDetails = () => fetchTmdb<TMDBDetailContent>(`/movie/${movie_id}`);
    return unstable_cache(fetchDetails, ["tmdb-movie-details", String(movie_id)], {
        revalidate: 86400,
    })();
}

export async function getDetails(media_type: string, id: number): Promise<TMDBDetailContent | null> {
    if (media_type === "tv") {
        return await getTvDetails(id)
    }
    if (media_type === "movie") {
        return await getMovieDetails(id)
    }
    return null
}

export async function getTvWatchProviders(series_id: number): Promise<TMDBWatchProvider[]> {
    const fetchProviders = async () => {
        const data = await fetchTmdb<{ results?: { JP?: { flatrate?: TMDBWatchProvider[] } } }>(
            `/tv/${series_id}/watch/providers`
        );
        return (data?.results?.JP?.flatrate ?? []) as TMDBWatchProvider[];
    };
    return unstable_cache(fetchProviders, ["tmdb-tv-providers", String(series_id)], {
        revalidate: 86400,
    })();
}

export async function getMovieWatchProviders(movie_id: number): Promise<TMDBWatchProvider[]> {
    const fetchProviders = async () => {
        const data = await fetchTmdb<{ results?: { JP?: { flatrate?: TMDBWatchProvider[] } } }>(
            `/movie/${movie_id}/watch/providers`
        );
        return (data?.results?.JP?.flatrate ?? []) as TMDBWatchProvider[];
    };
    return unstable_cache(fetchProviders, ["tmdb-movie-providers", String(movie_id)], {
        revalidate: 86400,
    })();
}

export async function getWatchProviders(media_type: string, id: number): Promise<TMDBWatchProvider[]> {
    if (media_type === "tv") {
        return await getTvWatchProviders(id)
    }
    if (media_type === "movie") {
        return await getMovieWatchProviders(id)
    }
    return []
}