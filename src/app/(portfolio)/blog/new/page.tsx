'use client';

import { useRouter } from 'next/navigation';
import { createPost } from '@/features/blog/server-actions';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

function FormContent() {
    const { pending } = useFormStatus();

    return (
        <>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    タイトル
                </label>
                <input
                    type="text"
                    name="title"
                    disabled={pending}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    本文
                </label>
                <textarea
                    name="content"
                    disabled={pending}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    rows={10}
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    カテゴリー
                </label>
                <input
                    type="text"
                    name="category"
                    disabled={pending}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="例: 技術"
                    required
                />
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    タグ（カンマ区切り）
                </label>
                <input
                    type="text"
                    name="tags"
                    disabled={pending}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="例: 技術, プログラミング, Next.js"
                />
            </div>

            <div className="flex justify-end gap-4">
                <Link
                    href="/blog"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    キャンセル
                </Link>
                <button
                    type="submit"
                    disabled={pending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {pending ? '投稿中...' : '投稿する'}
                </button>
            </div>        
        </>
    )
}

export default function NewBlogPost() {
    const router = useRouter();

    const handleCreatePost = async (formData: FormData) => {
        await createPost(formData);
        router.push('/blog');
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">新規記事作成</h1>
            <form action={handleCreatePost} className="space-y-6">
                <FormContent />
            </form>
        </div>
    );
}