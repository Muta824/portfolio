"use client";

import { motion } from "framer-motion";
import { PosterCard } from "../atoms/PosterCard";
import type { TMDBContent } from "../../types/data";

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export function TrendingRow({ title, contents }: { title: string; contents: TMDBContent[] }) {
    if (contents.length === 0) return null;

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 border-b-2 border-blue-500 dark:border-blue-400 pb-1 w-fit">
                {title}
            </h2>
            <motion.div
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-1 px-1"
                variants={container}
                initial="hidden"
                animate="visible"
                style={{ scrollbarWidth: "none" }}
            >
                {contents.map((content) => (
                    <motion.div
                        key={`${content.media_type}-${content.id}`}
                        variants={item}
                        className="min-w-[140px] sm:min-w-[160px]"
                    >
                        <PosterCard content={content} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
