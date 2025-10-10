import { GoBackLink } from '@/components/atoms/GoBackLink';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { CreateLink } from '@/features/blog/components/atoms/CreateLink';
import { BlogPosts } from '@/features/blog/components/organisms/BlogPosts';
import { Spinner } from '@/components/atoms/Spinner';
import { Suspense } from 'react';

// ページの再生成間隔を1時間に設定 (ISR)
export const revalidate = 3600;

export default async function BlogPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <GoBackLink />
                <ThemeToggle />
            </div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold dark:text-white">Blog</h1>
                <Suspense fallback={<Spinner />}>
                    <CreateLink />
                </Suspense>
            </div>
            <Suspense fallback={<Spinner />}>
                <BlogPosts />
            </Suspense>
        </>
    )
}