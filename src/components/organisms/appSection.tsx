import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import Link from 'next/link';

const apps = [
    {
        title: 'TOEIC',
        description: 'This is an application that allows you to learn TOEIC easily.',
        href: '/toeic',
    },
    {
        title: 'Todo',
        description: 'This is an application that allows you to manage your tasks easily.',
        href: '/todo',
    },
    {
        title: 'Blog',
        description: 'I post my articles related to programming, technology, books, and whatever I\'ve learned.',
        href: '/blog',
    },
    {
        title: 'Subscription Searcher',
        description: 'This is an application that allows you to search for what streaming services are availavle for a specific movie or TV show.',
        href: '/subscription_searcher',
    },
    {
        title: 'ChatBot',
        description: 'This is a ChatBot that allows you to ask anything about me and etc.',
        href: '/chat_bot',
    }
];

export function AppSection() {
    return (
        <section id="portfolio" className="p-6">
            <div className="mt-20 mb-8 text-center">
                <div className="inline-flex px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-2xl font-medium">
                    My Portfolio
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
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