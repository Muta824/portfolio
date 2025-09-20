import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import Link from 'next/link';

const apps = [
    {
        title: 'TOEIC',
        description: 'TOEICの学習をサポートするアプリケーション',
        href: '/toeic',
    },
    {
        title: 'Todo',
        description: 'タスク管理を簡単に行えるアプリケーション',
        href: '/todo',
    },
    {
        title: 'Blog',
        description: '記事の作成と管理ができるブログアプリケーション',
        href: '/blog',
    },
    {
        title: 'Subscription Searcher',
        description: 'サブスクリプションの検索ができるアプリケーション',
        href: '/subscription_searcher',
    }
];

export function AppSection() {
    return (
        <section id="portfolio" className="p-6">
            <div className="mt-24 mb-8 text-center">
                <Text variant="h2">My Portfolio</Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                    <Link key={app.href} href={app.href}>
                        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
                            <Text variant="h3">{app.title}</Text>
                            <Text variant="body" className="mt-2">
                                {app.description}
                            </Text>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}