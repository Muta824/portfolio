import React from 'react';
import { fetchGitHubContributions } from '@/lib/github';
import { unstable_cache } from 'next/cache';

const getLevelColor = (level: number): string => {
    switch (level) {
        case 0: return 'bg-gray-100 dark:bg-gray-800';
        case 1: return 'bg-green-200 dark:bg-green-900';
        case 2: return 'bg-green-400 dark:bg-green-700';
        case 3: return 'bg-green-600 dark:bg-green-500';
        case 4: return 'bg-green-800 dark:bg-green-300';
        default: return 'bg-gray-100 dark:bg-gray-800';
    }
};

// キャッシュされたデータ取得関数
const getCachedContributions = unstable_cache(
    async () => {
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const fromDate = oneYearAgo.toISOString().split('T')[0];
        const toDate = today.toISOString().split('T')[0];

        return await fetchGitHubContributions(fromDate, toDate);
    },
    ['github-contributions'],
    {
        tags: ['github-contributions'],
        revalidate: 3600, // 1 hour
    }
);

export async function ContributionGraph() {
    // Server Componentでキャッシュされたデータを取得
    const { contributions, totalContributions } = await getCachedContributions();

    if (!contributions || contributions.length === 0) {
        return <div className="p-2">Could not load contribution data.</div>;
    }

    return (
        <div className="mt-20 mx-auto max-w-4xl px-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {totalContributions.toLocaleString()} contributions in the last year
            </p>
            <div className="grid grid-flow-col grid-rows-7 gap-1 p-2 border rounded-md dark:border-gray-700 overflow-x-auto bg-white dark:bg-gray-900/50">
                {contributions.map((day) => (
                    <div
                        key={day.date}
                        className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)}`}
                        title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`}
                    />
                ))}
            </div>
        </div>
    );
}