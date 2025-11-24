'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Get correct answers from AnswerSet
 */
export async function getCorrectAnswers(testSetId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('Authentication required');
        }

        // Get AnswerSet related to TestSet
        // Use the first AnswerSet by default (can be made selectable in the future)
        const answerSet = await prisma.answerSet.findFirst({
            where: {
                testSetId,
            },
            include: {
                answers: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    
        if (!answerSet) {
            // Return empty object if AnswerSet doesn't exist
            return {} as Record<number, string>;
        }
    
        // Transform to Record<number, string> format
        return answerSet.answers.reduce((acc: Record<number, string>, answer: { questionId: number; correctAnswer: string }) => {
            acc[answer.questionId] = answer.correctAnswer;
            return acc;
        }, {} as Record<number, string>);
    } catch (error) {
        console.error('Error getting correct answers:', error);
        return {};
    }
}

/**
 * Create AnswerSet
 */
export async function createAnswerSet(
    testSetId: string,
    name: string,
    answers: Record<number, string>
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('Authentication required');
        }
    
        const answerSet = await prisma.answerSet.create({
            data: {
                testSetId,
                name,
                userId: session.user.id,
                answers: {
                    create: Object.entries(answers).map(([questionId, correctAnswer]) => ({
                        questionId: parseInt(questionId, 10),
                        correctAnswer,
                    })),
                },
            },
        });
    
        revalidatePath(`/toeic_scoring_app/${testSetId}`);
        return answerSet;
    } catch (error) {
        console.error('Error creating answer set:', error);
        return null;
    }
}

