import { BackToHome } from '@/components/atoms/BackToHome';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { BlogPostGrid } from '@/features/blog/components/organisms/BlogPostGrid';
import { BlogPost } from '@/features/blog/types/data';
import Link from 'next/link';
import { auth } from '../../../auth';

export default async function BlogPage() {
  const session = await auth();
  
  // サーバーサイドで記事を取得
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const fetchedPosts = await fetch(`${baseUrl}/api/blog/posts`);
  const posts: BlogPost[] = await fetchedPosts.json();

  console.log(posts);

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
      <BlogPostGrid initialPosts={posts} isUser={!!session?.user} />
    </main>
  );
}