'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Save test result
 */
export async function saveResult(
    testSetId: string,
    answerSheetId: string,
    data: {
        score: number;
        percentage: number;
        correctCount: number;
        totalQuestions: number;
    }
) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Authentication required');
    }

    try {
        // Check if answer sheet exists and verify permissions
        const answerSheet = await prisma.userAnswerSheet.findFirst({
            where: {
                id: answerSheetId,
                testSetId,
                userId: session.user.id,
            },
        });
    
        if (!answerSheet) {
            throw new Error('Answer sheet not found');
        }
    
        // Update existing result or create new one
        await prisma.result.upsert({
            where: {
                answerSheetId,
            },
            create: {
                answerSheetId,
                testSetId,
                name: answerSheet.name,
                userId: session.user.id,
                score: data.score,
                percentage: data.percentage,
                correctCount: data.correctCount,
                totalQuestions: data.totalQuestions,
            },
            update: {
                score: data.score,
                percentage: data.percentage,
                correctCount: data.correctCount,
                totalQuestions: data.totalQuestions,
                updatedAt: new Date(),
            },
        });
    } catch (error) {
        console.error('Error saving result:', error);
        return null;
    }

    revalidatePath(`/toeic_scoring_app/${testSetId}/${answerSheetId}/result`);
}

/**
 * Get test result
 */
export async function getResult(testSetId: string, answerSheetId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Authentication required');
    }

    try {
        const result = await prisma.result.findFirst({
            where: {
                answerSheetId,
                testSetId,
                userId: session.user.id,
            },
            include: {
                answerSheet: {
                    include: {
                        userAnswers: true,
                    },
                },
            },
        });
    
        if (!result) {
            return null;
        }
    
        // If correct answers are needed, get them from AnswerSet
        // For simplicity, only return userAnswers here
        return {
            id: result.id,
            testSetId: result.testSetId,
            answerSheetId: result.answerSheetId,
            name: result.name,
            userId: result.userId,
            score: result.score,
            percentage: result.percentage,
            correctCount: result.correctCount,
            totalQuestions: result.totalQuestions,
            completedAt: result.completedAt.toISOString(),
            answers: result.answerSheet.userAnswers.reduce((acc, answer) => {
                acc[answer.questionId] = answer.userAnswer || '';
                return acc;
            }, {} as Record<number, string>),
        };
    } catch (error) {
        console.error('Error getting result:', error);
        return null;
    }
}

