"use server"

import type { TMDBContent, TMDBWatchProvider } from "./types/data";

export async function getContents(query: string): Promise<TMDBContent[]> {
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=ja-JP`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    }
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`)
        }
        const data = await res.json() as { results: TMDBContent[] }
        const filteredResults = data.results.filter((result) => result.media_type === "movie" || result.media_type === "tv")
        return filteredResults
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getTvDetails(series_id: number) {
    const url = `https://api.themoviedb.org/3/tv/${series_id}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    }
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getMovieDetails(movie_id: number) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    }
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getDetails(media_type: string, id: number) {
    if (media_type === "tv") {
        return await getTvDetails(id)
    } else if (media_type === "movie") {
        return await getMovieDetails(id)
    }
}

export async function getTvWatchProviders(series_id: number): Promise<TMDBWatchProvider[]> {
    const url = `https://api.themoviedb.org/3/tv/${series_id}/watch/providers`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    }
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`)
        }
        const data = await res.json()
        const jpProviders = (data.results?.JP?.flatrate || []) as TMDBWatchProvider[]
        return jpProviders
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getMovieWatchProviders(movie_id: number): Promise<TMDBWatchProvider[]> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    }
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`API request failed with status: ${res.status}`)
        }
        const data = await res.json()
        const jpProviders = (data.results?.JP?.flatrate || []) as TMDBWatchProvider[]
        return jpProviders
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getWatchProviders(media_type: string, id: number) {
    if (media_type === "tv") {
        return await getTvWatchProviders(id)
    } else if (media_type === "movie") {
        return await getMovieWatchProviders(id)
    }
}