import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | My Portfolio',
    description: '技術メモ、書籍紹介、日記などを書いています。',
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto p-4 min-h-screen transition-colors">
            {children}
        </div>
    )
}