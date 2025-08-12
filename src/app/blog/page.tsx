import { BackToHome } from '@/components/atoms/BackToHome';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { BlogPostGrid } from '@/features/blog/components/organisms/BlogPostGrid';
import { BlogPost } from '@/features/blog/types/data';
import Link from 'next/link';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// ページの再生成間隔を1時間に設定 (ISR)
export const revalidate = 3600;

export default async function BlogPage() {
  const session = await auth();
  
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
}