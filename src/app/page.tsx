'use client'

import './globals.css'
import { DefaultLayout } from '@/components/templates/DefaultLayout';
import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import Link from 'next/link';

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
      title: 'ブログ',
      description: '記事の作成と管理ができるブログアプリケーション',
      href: '/blog',
    },
  ];

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <Text variant="h1">マイアプリケーション</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Link key={app.href} href={app.href}>
              <Card className="hover:shadow-lg transition-shadow">
                <Text variant="h3">{app.title}</Text>
                <Text variant="body" className="mt-2">
                  {app.description}
                </Text>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}
