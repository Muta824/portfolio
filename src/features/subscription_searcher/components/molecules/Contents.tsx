import Image from "next/image";
import Link from "next/link";
import type { TMDBContent } from "../../types/data";

export function Contents({ 
    contents,
    searchQuery,
}: {
    contents: TMDBContent[] 
    searchQuery: string
}) {
    if (contents.length === 0 && searchQuery.trim() !== "") {
        return (
            <div className="h-full p-4 flex items-center justify-center text-center text-2xl sm:text-5xl text-gray-600 dark:text-gray-400 font-serif italic tracking-wide leading-relaxed">
                No results found for &quot;{searchQuery}&quot;
            </div>
        )
    }

    const posterUrl = (path: string | null) =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 w-full">
            {contents.map((content) => {
                const title = content.title || content.name || content.original_title || content.original_name || "Unknown";
                const src = posterUrl(content.poster_path);
                return (
                    <div key={content.id} className="w-full min-w-0">
                        <Link 
                            href={`/subscription_searcher/${content.media_type}/${content.id}`}
                            aria-label={`View details for ${title}`}
                            className="block min-h-[44px]"
                        >
                            {src ? (
                                <Image 
                                    src={src} 
                                    alt={title}
                                    width={500}
                                    height={750}
                                    className="border dark:border-white w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                                />
                            ) : (
                                <div 
                                    className="flex items-center justify-center w-full aspect-[2/3] rounded-lg shadow-lg border dark:border-white bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-center p-4"
                                    aria-label={`${title} - No poster available`}
                                >
                                    <span className="text-sm">{title}</span>
                                </div>
                            )}
                            <p className="mt-2 text-center font-medium line-clamp-2 text-sm sm:text-base">{title}</p>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}