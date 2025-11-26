'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { getPost, updatePost } from '@/features/blog/server-actions';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import Loading from './loading';
import { CategoryType, TagType } from '@/features/blog/types/data';

function FormContent({ post }: { post: {
    title: string;
    content: string;
    categories: string;
    tags: string;
} }) {
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
                    defaultValue={post.title}
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
                    defaultValue={post.content}
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
                    defaultValue={post.categories}
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
                    defaultValue={post.tags}
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

export default function EditBlogPost({ 
    params,
}: {
    params: Promise<{slug: string}>,
}) {
    const { slug } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categories: '',
        tags: '',
    });

    // 記事をslugから取得し、フォームに設定
    useEffect(() => {
        (async () => {
            const postData = await getPost(slug);
            if (!postData) {
                setIsLoading(false);
                setError('記事が見つかりません');
                return;
            }
            setFormData({
                title: postData.title,
                content: postData.content,
                categories: postData.categories.map((category: CategoryType) => category.name).join(','),
                tags: postData.tags.map((tag: TagType) => tag.name).join(','),
            });
        })();
        setIsLoading(false);
    }, [slug]);

    if (isLoading) {
        return <Loading />;
    }

    const handleUpdatePost = async (formData: FormData) => {
        await updatePost(formData);
        router.push('/blog');
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8">
                <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                    エラーが発生しました
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <Link
                    href="/blog"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    ブログ一覧に戻る
                </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="px-4">
            <h1 className="mt-4 text-3xl font-bold dark:text-white">記事を編集</h1>

            <form action={handleUpdatePost} className="space-y-6 mt-8">
                <input type="hidden" name="slug" value={slug} />
                <FormContent post={formData} />
            </form>
        </div>
    );
}
