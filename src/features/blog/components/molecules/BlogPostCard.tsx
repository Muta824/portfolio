import { FC } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  slug: string;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  excerpt,
  publishedAt,
  category,
  tags,
  slug,
}) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Link href={`/blog/${slug}`} className="block p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              {category.name}
            </span>
            <time dateTime={publishedAt.toISOString()}>
              {formatDate(publishedAt)}
            </time>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}; 