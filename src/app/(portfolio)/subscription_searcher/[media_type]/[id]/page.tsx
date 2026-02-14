import Image from "next/image";
import { getDetails, getWatchProviders } from "@/features/subscription_searcher/server-actions";
import NotFound from "./not-found";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { GoBackButton } from "@/features/subscription_searcher/components/atoms/GoBackButton";
import type { TMDBWatchProvider } from "@/features/subscription_searcher/types/data";

export default async function WatchProviderPage({ 
    params 
}: { 
    params: Promise<{ media_type: string, id: number }> 
}) {
    const { media_type, id } = await params;
    const [watchProviders, content] = await Promise.all([
        getWatchProviders(media_type, id),
        getDetails(media_type, id)
    ]);

    if (!content) {
        return <NotFound />
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <GoBackButton />
                <ThemeToggle />
            </div>
            <div className="flex flex-col lg:flex-row gap-6 justify-center">
                {content.poster_path ? (
                    <Image 
                        src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} 
                        alt={content.original_name || content.original_title || "Content poster"}
                        width={300}
                        height={450}
                        className="m-auto rounded-xl shadow-lg border dark:border-white"
                    />
                ) : (
                    <div 
                        className="flex items-center justify-center w-[300px] h-[450px] m-auto rounded-xl shadow-lg border dark:border-white bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-center p-4"
                        aria-label="No poster available"
                    >
                        <span>No poster</span>
                    </div>
                )}
                <div className="flex flex-col gap-4 m-auto items-center relative">
                    <h1 className="my-4 text-4xl lg:text-5xl font-bold">
                        {content.original_name || content.original_title}
                    </h1>
                                
                    <p className="text-lg mt-4 mb-16">
                        {content.overview}
                    </p>
                                
                    <div className="flex flex-wrap gap-6 text-md absolute left-0 bottom-0">
                        {content.first_air_date && 
                            <span>First Aired: {new Date(content.first_air_date).toLocaleDateString()}</span>
                        }
                        {content.vote_average && 
                            <div className="flex items-center gap-1">
                                <svg className="inline w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
                                </svg>
                                <span>{content.vote_average.toFixed(1)}/10</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <hr className="my-12 border-t-2 border-gray-300 dark:border-gray-500" />

            {/* Subscription Providers Section */}
            <div>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Where to Watch</h2>
                    <p className="text-lg max-w-2xl mx-auto">
                        Find your favorite streaming services that offer this content
                    </p>
                </div>

                {watchProviders && watchProviders.length > 0 ? (
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {watchProviders.map((watchProvider: TMDBWatchProvider) => (
                            <div 
                                key={watchProvider.provider_id}
                                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden"
                            >
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {watchProvider.provider_name}
                                    </h3>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                                        Available
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mb-2">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Providers Available</h3>
                        <p className="max-w-md mx-auto text-gray-600 dark:text-gray-300">
                            This content is not currently available on any subscription streaming services in your region.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}