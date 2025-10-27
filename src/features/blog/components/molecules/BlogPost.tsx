import { Text } from "@/components/atoms/Text";
import { Card } from "@/components/molecules/Card";
import { BlogPostType } from "@/features/blog/types/data";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { EllipsisButton } from "@/features/blog/components/molecules/EllipsisButton";

export function BlogPost({ 
    post,
    isUserAdmin,
}: {
    post: BlogPostType;
    isUserAdmin: boolean;
}) {
    const publishedAtDate = typeof post.publishedAt === 'string' ? new Date(post.publishedAt) : post.publishedAt;
    
    return (
        <Card className="relative">
            {isUserAdmin && (
                <div className="absolute top-2 right-2 z-10">
                    <EllipsisButton slug={post.slug} />
                </div>
            )}
            
            <Link href={`/blog/${post.slug}`} className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {post.categories.map((category) => (
                        <span key={category.id} className="px-2 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded-full">
                            {category.name}
                        </span>
                    ))}
                    <time dateTime={publishedAtDate.toISOString()}>
                        {formatDate(post.publishedAt)}
                    </time>
                </div>

                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    {post.title}
                </Text>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag.id} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </Link>
        </Card>
    )
}