import Image from "next/image";
import Link from "next/link";

export function Contents({ 
    contents,
    searchQuery,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents: any[] 
    searchQuery: string
}) {
    if (contents.length === 0 && searchQuery.trim() !== "") {
        return (
            <div className="h-full p-4 flex items-center justify-center text-center text-5xl text-gray-600 font-serif italic tracking-wide leading-relaxed">
                No results found for &quot;{searchQuery}&quot;
            </div>
        )
    }

    return (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {contents.map((content: any) => (
                <div key={content.id} className="w-full max-w-xs">
                    <Link href={`/subscription_searcher/${content.media_type}/${content.id}`}>
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} 
                            alt="Sorry, the image is not available"
                            width={500}
                            height={750}
                            className="border dark:border-white w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                        />
                    </Link>
                </div>
            ))}
        </div>
    )
}