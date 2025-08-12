import { Text } from '@/components/atoms/Text';
import { Card } from '@/components/molecules/Card';
import { Navigation } from '@/components/organisms/Navigation';
import { SkillsSection } from '@/components/organisms/SkillsSection';
import Link from 'next/link';
import './globals.css';

export default function Home() {
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

  return (
    <main className="min-h-screen dark:bg-gray-900">
      <Navigation className="dark:border-b dark:border-gray-700"/>
      
      {/* アプリケーションセクション */}
      <section className="pt-10 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Text variant="h1">My Applications</Text>
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>

      {/* 技術スキルセクション */}
      <SkillsSection />
    </main>
  )
}
