'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { getPost, updatePost } from '@/features/blog/server-actions';
import Link from 'next/link';
import Loading from './loading';

export default function EditBlogPost({ 
    params,
}: {
    params: Promise<{slug: string}>,
}) {
    const { slug } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
    });

    // 記事をslugから取得し、フォームに設定
    useEffect(() => {
        (async () => {
            const post = await getPost(slug);
            if (!post) {
                setIsLoading(false);
                setError('記事が見つかりません');
                return;
            }
            setFormData({
                title: post.title,
                content: post.content,
                category: post.category.name,
                tags: post.tags.map(tag => tag.name).join(', '),
            });
        })();
        setIsLoading(false);
    }, [slug]);

    if (isLoading) {
        return <Loading />;
    }

    const handleUpdatePost = async (formData: FormData) => {
        setIsSaving(true);
        try {
            await updatePost(formData);
            router.push('/blog');
        } catch (error) {
            console.error('Failed to update post:', error);
        }
        setIsSaving(false);
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
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        タイトル
                    </label>
                    <input
                        name="title"
                        type="text"
                        disabled={isSaving}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        本文
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        disabled={isSaving}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        rows={10}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        カテゴリー
                    </label>
                    <input
                        name="category"
                        type="text"
                        value={formData.category}
                        disabled={isSaving}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="例: 技術"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        タグ（カンマ区切り）
                    </label>
                    <input
                        name="tags"
                        type="text"
                        value={formData.tags}
                        disabled={isSaving}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? '更新中...' : '更新する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
