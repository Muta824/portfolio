import Link from 'next/link';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

export default function NotFound() {
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

      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          記事が見つかりません
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          お探しの記事は存在しないか、削除された可能性があります。
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          ブログ一覧に戻る
        </Link>
      </div>
    </main>
  );
} 