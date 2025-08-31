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

// ページの再生成間隔を1時間に設定 (ISR)
export const revalidate = 3600;

// ビルド時に静的生成するパスを定義
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });
  return posts
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mb-4 mt-8 dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mb-3 mt-6 dark:text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold mb-2 mt-4 dark:text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed dark:text-gray-300">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-1 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="dark:text-gray-300">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    return isInline ? (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm dark:bg-gray-800 dark:text-gray-200">
        {children}
      </code>
    ) : (
      <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-gray-800 dark:text-gray-200">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4 dark:bg-gray-800">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <Image
      src={typeof src === 'string' ? src : ''}
      alt={alt || ''}
      width={800}
      height={600}
      className="max-w-full h-auto rounded-lg my-4"
    />
  ),
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
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
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm dark:bg-blue-900 dark:text-blue-200">
                {post.category.name}
              </span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">タグ:</span>
                {post.tags.map((tag) => (
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
      </main>
    );
}
