'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';

interface TestResultData {
    testSetId: string;
    answers: Record<number, string>;
    correctAnswers: Record<number, string>;
    score: number;
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
}

interface TestResultProps {
    testSetId: string;
}

export function TestResult({ testSetId }: TestResultProps) {
    const [result, setResult] = useState<TestResultData | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(`toeic_scoring_result_${testSetId}`);
        if (stored) {
            setResult(JSON.parse(stored));
        }
    }, [testSetId]);

    if (!result) {
        return (
            <Card>
                <Text>結果が見つかりませんでした。</Text>
            </Card>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="space-y-4">
                <Text variant="h2">Score</Text>
                <div className="text-center space-y-2">
                    <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
                        {result.score}
                    </div>
                    <Text variant="small">満点: 990点</Text>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                        <Text variant="small" className="text-gray-600 dark:text-gray-400">正解数</Text>
                        <Text variant="h3">{result.correctCount} / {result.totalQuestions}</Text>
                    </div>
                    <div>
                        <Text variant="small" className="text-gray-600 dark:text-gray-400">正答率</Text>
                        <Text variant="h3">{Math.round(result.percentage)}%</Text>
                    </div>
                </div>
                <Text variant="small" className="text-gray-500">
                    完了日時: {new Date(result.completedAt).toLocaleString('ja-JP')}
                </Text>
            </Card>

            <div className="flex gap-4">
                <Link 
                    href={`/toeic_scoring_app/${testSetId}`}
                    className="rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-6 py-3 text-lg min-w-[120px] text-center"
                >
                    テストに戻る
                </Link>
                <Link 
                    href="/toeic_scoring_app"
                    className="rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 px-6 py-3 text-lg min-w-[120px] text-center"
                >
                    テスト一覧に戻る
                </Link>
            </div>
        </div>
    );
}