import { getTrendingMovies, getTrendingTV } from "@/features/subscription_searcher/server-actions";
import { SubscriptionSearchClient } from "@/features/subscription_searcher/components/SubscriptionSearchClient";

export default async function SubscriptionSearchPage() {
    const [initialTrendingMovies, initialTrendingTV] = await Promise.all([
        getTrendingMovies(),
        getTrendingTV(),
    ]);

    return (
        <SubscriptionSearchClient
            initialTrendingMovies={initialTrendingMovies}
            initialTrendingTV={initialTrendingTV}
        />
    );
}
