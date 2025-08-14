import { Text } from "@/components/atoms/Text";
import { Card } from "@/components/molecules/Card";
import { BlogPostType } from "@/features/blog/types/data";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export function BlogPost({ post }: { post: BlogPostType }) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <Card className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {post.category.name}
                    </span>
                    <time dateTime={post.publishedAt.toISOString()}>
                        {formatDate(post.publishedAt)}
                    </time>
                </div>

                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    {post.title}
                </Text>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag.id} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </Card>
        </Link>
    )
}