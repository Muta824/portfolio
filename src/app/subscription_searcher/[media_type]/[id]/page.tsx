import Image from "next/image";
import { getDetails, getWatchProviders } from "@/features/subscription_searcher/server-actions";
import NotFound from "./not-found";

export default async function WatchProviderPage({ 
    params 
}: { 
    params: Promise<{ media_type: string, id: number }> 
}) {
    const { media_type, id } = await params;
    const watchProviders = await getWatchProviders(media_type, id);
    const content = await getDetails(media_type, id);

    if (!content) {
        return <NotFound />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                        {/* Poster Image */}
                        <div className="relative group">
                            <Image 
                                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} 
                                alt={content.original_name || "Content poster"}
                                width={300}
                                height={450}
                                className="rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                            />
                        </div>
                        
                        {/* Content Info */}
                        <div className="flex-1 space-y-6">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {content.original_name || content.original_title}
                            </h1>
                            
                            {content.overview && (
                                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                                    {content.overview}
                                </p>
                            )}
                            
                            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                                {content.first_air_date && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z" />
                                        </svg>
                                        <span>First Aired: {new Date(content.first_air_date).toLocaleDateString()}</span>
                                    </div>
                                )}
                                
                                {content.vote_average && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span>{content.vote_average.toFixed(1)}/10</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Providers Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Where to Watch</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find your favorite streaming services that offer this content
                    </p>
                </div>

                {watchProviders && watchProviders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {watchProviders.map((watchProvider: any) => (
                            <div 
                                key={watchProvider.provider_id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {watchProvider.provider_name}
                                    </h3>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Available
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Providers Available</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            This content is not currently available on any subscription streaming services in your region.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}