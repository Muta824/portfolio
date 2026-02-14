export interface TMDBContent {
    id: number;
    media_type: "movie" | "tv";
    poster_path: string | null;
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
}

export interface TMDBWatchProvider {
    provider_id: number;
    provider_name: string;
    logo_path?: string;
}

export interface TMDBDetailContent {
    id: number;
    poster_path: string | null;
    original_name?: string;
    original_title?: string;
    overview?: string;
    first_air_date?: string;
    release_date?: string;
    vote_average?: number;
}
