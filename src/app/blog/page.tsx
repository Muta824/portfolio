import { BackToHome } from '@/components/atoms/BackToHome';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { CreateLink } from '@/features/blog/components/atoms/CreateLink';
import { BlogPosts } from '@/features/blog/components/organisms/BlogPosts';

// ページの再生成間隔を1時間に設定 (ISR)
export const revalidate = 3600;

export default async function BlogPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <BackToHome />
        <ThemeToggle />
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold dark:text-white">Blog</h1>
        <CreateLink />
      </div>
      <BlogPosts />
    </main>
  );
}