import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getPost } from '@/features/blog/server-actions';
import prisma from '@/lib/prisma/prisma';
import type { Components } from 'react-markdown';
import { CategoryType, TagType } from '@/features/blog/types/data';

// ページの再生成間隔を1時間に設定 (ISR)
export const revalidate = 3600;

// ビルド時に静的生成するパスを定義
export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        select: {
            slug: true,
        },
    });
    return posts;
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

const components: Components = {
    ul: ({ children }) => (
        <ul className="list-disc">
            {children}
        </ul>
    ),
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="mx-auto px-4 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <Link
                    href="/blog"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                    ← ブログ一覧に戻る
                </Link>
                <ThemeToggle />
            </div>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                {/* ヘッダー */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 dark:text-white">
                        {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span>投稿者: {post.author.name}</span>
                        <span>
                            投稿日: {format(post.publishedAt, 'yyyy年MM月dd日', { locale: ja })}
                        </span>
                        {post.updatedAt !== post.publishedAt && (
                            <span>
                            更新日: {format(post.updatedAt, 'yyyy年MM月dd日', { locale: ja })}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">カテゴリ:</span>
                        <span className="flex flex-wrap items-center gap-2">
                            {post.categories.map((category: CategoryType) => (
                                <span key={category.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm dark:bg-blue-900 dark:text-blue-200">
                                    {category.name}
                                </span>
                            ))}
                        </span>
                    </div>

                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">タグ:</span>
                            {post.tags.map((tag: TagType) => (
                            <span
                                key={tag.id}
                                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm dark:bg-gray-700 dark:text-gray-200"
                            >
                                {tag.name}
                            </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* サムネイル画像 */}
                {post.thumbnailUrl && (
                    <div className="mb-8">
                        <Image
                            src={post.thumbnailUrl}
                            alt={post.title}
                            width={800}
                            height={256}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* コンテンツ */}
                <div className="markdown-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
