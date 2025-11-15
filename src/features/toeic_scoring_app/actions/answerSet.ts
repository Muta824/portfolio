'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma/prisma';
import { revalidatePath } from 'next/cache';

/**
 * 正解の答えを取得（AnswerSetから）
 */
export async function getCorrectAnswers(testSetId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
        // まず、TestSetに関連するAnswerSetを取得
        // デフォルトでは最初のAnswerSetを使用（将来的には選択可能にする）
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
            // AnswerSetが存在しない場合は空のオブジェクトを返す
            return {} as Record<number, string>;
        }
    
        // Record<number, string>形式に変換
        return answerSet.answers.reduce((acc, answer) => {
            acc[answer.questionId] = answer.correctAnswer;
            return acc;
        }, {} as Record<number, string>);
    } catch (error) {
        console.error('Error getting correct answers:', error);
        return {};
    }
}

/**
 * AnswerSetを作成
 */
export async function createAnswerSet(
    testSetId: string,
    name: string,
    answers: Record<number, string>
) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
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

