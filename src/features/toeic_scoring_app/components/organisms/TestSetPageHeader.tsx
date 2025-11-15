'use client';

import { useEffect, useState } from 'react';
import { Text } from '@/components/atoms/Text';
import { GoBackLink } from '@/components/atoms/GoBackLink';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { getUserAnswerSheet } from '../../utils/userAnswerSheetManager';
import { UserAnswerSheet } from '../../types/data';

interface TestSetPageHeaderProps {
    testSetId: string;
    answerSheetId: string;
}

export function TestSetPageHeader({ testSetId, answerSheetId }: TestSetPageHeaderProps) {
    const [answerSheet, setAnswerSheet] = useState<UserAnswerSheet | null>(null);

    useEffect(() => {
        const sheet = getUserAnswerSheet(testSetId, answerSheetId);
        setAnswerSheet(sheet);
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

