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

export async function getContents(query: string): Promise<TMDBContent[]> {
    const fetchContents = async () => {
        try {
            const path = `/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=ja-JP`;
            const data = await fetchTmdbOrThrow<{ results: TMDBContent[] }>(path);
            return data.results.filter(
                (result) => result.media_type === "movie" || result.media_type === "tv"
            );
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    return unstable_cache(fetchContents, ["tmdb-contents", query], {
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