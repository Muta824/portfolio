"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TMDBContent } from "../../types/data";

const IMAGE_BASE = "https://image.tmdb.org/t/p";
const BACKDROP_SIZE = "w1280";
const POSTER_SIZE = "w500";

function formatDate(value: string | undefined): string {
    if (!value) return "";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
}

export function TrendingHero({ content }: { content: TMDBContent }) {
    const title =
        content.title ||
        content.name ||
        content.original_title ||
        content.original_name ||
        "Unknown";
    const hasBackdrop = content.backdrop_path;
    const hasPoster = content.poster_path;
    const imagePath = hasBackdrop ? content.backdrop_path! : hasPoster ? content.poster_path! : null;
    const imageSize = hasBackdrop ? BACKDROP_SIZE : POSTER_SIZE;
    const imageUrl = imagePath ? `${IMAGE_BASE}/${imageSize}${imagePath}` : null;
    const overview = content.overview ?? "";
    const dateLabel =
        content.media_type === "movie"
            ? content.release_date
                ? formatDate(content.release_date)
                : ""
            : content.first_air_date
              ? formatDate(content.first_air_date)
              : "";
    const vote = content.vote_average != null ? content.vote_average.toFixed(1) : null;
    const subtitle =
        content.media_type === "movie" ? "今週人気の映画" : "今週人気のドラマ";
    const detailHref = `/subscription_searcher/${content.media_type}/${content.id}`;

    if (!imageUrl) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-10 -mx-3 sm:-mx-4"
        >
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg">
                {/* Mobile: 画像 16:9 + オーバーレイ + 詳細ボタン */}
                <div className="relative lg:hidden">
                    <div className="relative w-full overflow-hidden rounded-t-2xl aspect-video min-h-[200px]">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1280px"
                            priority
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent"
                            aria-hidden
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                            <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">
                                {title}
                            </h2>
                            <p className="mt-1 text-sm sm:text-base text-gray-200">
                                {subtitle}
                            </p>
                            <Link
                                href={detailHref}
                                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-sm backdrop-blur-sm transition-colors"
                            >
                                詳細を見る
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Desktop: テキスト 6 : 画像 5 の比率 */}
                <div className="hidden lg:flex lg:min-h-[280px] justify-center">
                    <div className="flex flex-col justify-center flex-[6] p-8 xl:p-12 max-w-lg">
                        <p className="text-sm font-medium text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                            {subtitle}
                        </p>
                        <h2 className="mt-2 text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        {overview && (
                            <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-4 text-sm xl:text-base leading-relaxed">
                                {overview}
                            </p>
                        )}
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            {dateLabel && <span>{dateLabel}</span>}
                            {vote != null && (
                                <span className="inline-flex items-center gap-1">
                                    <span className="text-amber-500 dark:text-amber-400" aria-hidden>★</span>
                                    {vote}/10
                                </span>
                            )}
                        </div>
                        <Link
                            href={detailHref}
                            className="mt-6 inline-flex w-fit items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-md"
                        >
                            詳細を見る
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className="relative flex-[5] min-w-0 max-w-lg aspect-[4/3] overflow-hidden rounded-2xl m-3">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="(min-width: 1024px) 50vw, 0"
                            priority
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
