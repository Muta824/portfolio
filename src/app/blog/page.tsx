import { BackToHome } from '@/components/atoms/BackToHome';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { BlogPostGrid } from '@/features/blog/components/organisms/BlogPostGrid';
import { BlogPost } from '@/features/blog/types/data';
import Link from 'next/link';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export default async function BlogPage() {
  const session = await auth();
  
  try {
    const [posts, categories] = await Promise.all([
      prisma.post.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          publishedAt: true,
          thumbnailUrl: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
        },
      }),
    ]);

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <BackToHome />
          <ThemeToggle />
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white">Blog</h1>
          <div className="flex items-center gap-4">
            {session?.user && (
              <Link
                href="/blog/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                新規作成
              </Link>
            )}
          </div>
        </div>
        <BlogPostGrid 
          posts={posts as unknown as BlogPost[]} 
          categories={categories}
          isUser={!!session?.user} 
        />
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch blog data:', error);
    
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <BackToHome />
          <ThemeToggle />
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white">Blog</h1>
        </div>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">データの取得に失敗しました</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                ブログ記事の読み込み中にエラーが発生しました。しばらく時間をおいて再度お試しください。
              </p>
            </div>
            <Link
              href="/blog"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              再試行
            </Link>
          </div>
        </div>
      </main>
    );
  }
}