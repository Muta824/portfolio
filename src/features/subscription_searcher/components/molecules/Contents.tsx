import Image from "next/image";
import Link from "next/link";

export function Contents({ 
    contents
}: {
    contents: any[] 
}) {
    return (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {contents.map((content: any) => (
                <div key={content.id} className="w-full max-w-xs">
                    <Link href={`/subscription_searcher/${content.media_type}/${content.id}`}>
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} 
                            alt="Sorry, the image is not available"
                            width={500}
                            height={750}
                            className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                        />
                    </Link>
                </div>
            ))}
        </div>
    )
}