'use client';

import { useEffect, useState } from 'react';
import { Text } from '@/components/atoms/Text';
import { GoBackLink } from '@/components/atoms/GoBackLink';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { getUserAnswerSheet } from '../../actions/userAnswerSheet';
import { UserAnswerSheet } from '../../types/data';

interface TestSetPageHeaderProps {
    testSetId: string;
    answerSheetId: string;
}

export function TestSetPageHeader({ testSetId, answerSheetId }: TestSetPageHeaderProps) {
    const [answerSheet, setAnswerSheet] = useState<UserAnswerSheet | null>(null);

    useEffect(() => {
        getUserAnswerSheet(testSetId, answerSheetId).then((sheet) => {
            setAnswerSheet(sheet);
        }).catch((error) => {
            console.error('エラーが発生しました:', error);
        });
    }, [testSetId, answerSheetId]);

    return (
        <>
            <div className="flex justify-between items-center">
                <GoBackLink href={`toeic_scoring_app/${testSetId}`} />
                <ThemeToggle />
            </div>
            {answerSheet && (
                <Text variant="h1">{answerSheet.name}</Text>
            )}
        </>
    );
}

