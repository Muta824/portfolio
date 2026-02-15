import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TMDBContent } from "../../types/data";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export function PosterCard({ content, className }: { content: TMDBContent; className?: string }) {
    const title =
        content.title ||
        content.name ||
        content.original_title ||
        content.original_name ||
        "Unknown";
    const src = content.poster_path ? `${POSTER_BASE}${content.poster_path}` : null;

    return (
        <div className={`flex-shrink-0 snap-start ${className ?? ""}`}>
            <Link
                href={`/subscription_searcher/${content.media_type}/${content.id}`}
                aria-label={`View details for ${title}`}
                className="block min-h-[44px]"
            >
                <motion.div
                    className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    {src ? (
                        <Image
                            src={src}
                            alt={title}
                            width={500}
                            height={750}
                            className="w-full h-auto object-cover aspect-[2/3] border border-gray-200 dark:border-gray-700"
                        />
                    ) : (
                        <div
                            className="flex items-center justify-center w-full aspect-[2/3] rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-center p-4 border border-gray-200 dark:border-gray-700"
                            aria-label={`${title} - No poster available`}
                        >
                            <span className="text-sm line-clamp-3">{title}</span>
                        </div>
                    )}
                </motion.div>
                <p className="mt-2 text-center font-medium line-clamp-2 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    {title}
                </p>
            </Link>
        </div>
    );
}
