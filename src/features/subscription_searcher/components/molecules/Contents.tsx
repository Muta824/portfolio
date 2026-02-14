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
            <div className="h-full p-4 flex items-center justify-center text-center text-5xl text-gray-600 dark:text-gray-400 font-serif italic tracking-wide leading-relaxed">
                No results found for &quot;{searchQuery}&quot;
            </div>
        )
    }

    const posterUrl = (path: string | null) =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : null;

    return (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {contents.map((content) => {
                const title = content.title || content.name || content.original_title || content.original_name || "Unknown";
                const src = posterUrl(content.poster_path);
                return (
                    <div key={content.id} className="w-full max-w-xs">
                        <Link 
                            href={`/subscription_searcher/${content.media_type}/${content.id}`}
                            aria-label={`View details for ${title}`}
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
                            <p className="mt-2 text-center font-medium line-clamp-2">{title}</p>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}