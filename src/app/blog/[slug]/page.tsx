import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    // サーバーサイドで記事を取得
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      notFound();
    }

    const post: Post = await response.json();

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
                投稿日: {format(new Date(post.publishedAt), 'yyyy年MM月dd日', { locale: ja })}
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span>
                  更新日: {format(new Date(post.updatedAt), 'yyyy年MM月dd日', { locale: ja })}
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
              components={{
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
                    src={src || ''}
                    alt={alt || ''}
                    width={800}
                    height={600}
                    className="max-w-full h-auto rounded-lg my-4"
                  />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-300 dark:border-gray-600">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600 dark:text-gray-300">
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    notFound();
  }
}
