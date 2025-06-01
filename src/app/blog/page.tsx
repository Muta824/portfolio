import { BlogPostGrid } from '@/features/blog/components/organisms/BlogPostGrid';
import { CategoryFilter } from '@/features/blog/components/molecules/CategoryFilter';
import { SearchBar } from '@/features/blog/components/molecules/SearchBar';
import { ThemeToggle } from '@/features/blog/components/atoms/ThemeToggle';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  return posts;
}

async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Blog</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/blog/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規作成
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <SearchBar />
      <CategoryFilter categories={categories} />
      <BlogPostGrid posts={posts} />
    </main>
  );
}