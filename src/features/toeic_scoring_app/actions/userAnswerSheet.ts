'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma/prisma';
import { revalidatePath } from 'next/cache';

/**
 * ユーザー回答用紙一覧を取得
 */
export async function getUserAnswerSheets(testSetId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
        const answerSheets = await prisma.userAnswerSheet.findMany({
            where: {
                testSetId,
                userId: session.user.id,
            },
            include: {
                userAnswers: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    
        // UserAnswerSheet型に変換
        return answerSheets.map(sheet => ({
            id: sheet.id,
            testSetId: sheet.testSetId,
            name: sheet.name,
            userId: sheet.userId,
            createdAt: sheet.createdAt,
            updatedAt: sheet.updatedAt,
            answers: sheet.userAnswers.reduce((acc, answer) => {
                acc[answer.questionId] = answer.userAnswer || '';
                return acc;
            }, {} as Record<number, string>),
        }));
    } catch (error) {
        console.error('Error getting user answer sheets:', error);
        return [];
    }
}

/**
 * ユーザー回答用紙を取得（IDで）
 */
export async function getUserAnswerSheet(testSetId: string, answerSheetId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
        const answerSheet = await prisma.userAnswerSheet.findFirst({
            where: {
                id: answerSheetId,
                testSetId,
                userId: session.user.id,
            },
            include: {
                userAnswers: true,
            },
        });
    
        if (!answerSheet) {
            return null;
        }
    
        return {
            id: answerSheet.id,
            testSetId: answerSheet.testSetId,
            name: answerSheet.name,
            userId: answerSheet.userId,
            createdAt: answerSheet.createdAt,
            updatedAt: answerSheet.updatedAt,
            answers: answerSheet.userAnswers.reduce((acc, answer) => {
                acc[answer.questionId] = answer.userAnswer || '';
                return acc;
            }, {} as Record<number, string>),
        };
    } catch (error) {
        console.error('Error getting user answer sheet:', error);
        return null;
    }
}

/**
 * 新しいユーザー回答用紙を作成
 */
export async function createUserAnswerSheet(testSetId: string, name: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
        const answerSheet = await prisma.userAnswerSheet.create({
            data: {
                testSetId,
                name,
                userId: session.user.id,
            },
        });
    
        revalidatePath(`/toeic_scoring_app/${testSetId}`);
        
        // UserAnswerSheet型に変換
        return {
            id: answerSheet.id,
            testSetId: answerSheet.testSetId,
            name: answerSheet.name,
            userId: answerSheet.userId,
            createdAt: answerSheet.createdAt,
            updatedAt: answerSheet.updatedAt,
            answers: {},
        };
    } catch (error) {
        console.error('Error creating user answer sheet:', error);
        return null;
    }
}

/**
 * ユーザー回答用紙を保存（回答も含む）
 */
export async function saveUserAnswerSheet(
    testSetId: string,
    answerSheetId: string,
    answers: Record<number, string>
) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
        // 回答用紙の存在確認と権限確認
        const existingSheet = await prisma.userAnswerSheet.findFirst({
            where: {
                id: answerSheetId,
                testSetId,
                userId: session.user.id,
            },
        });
    
        if (!existingSheet) {
            throw new Error('回答用紙が見つかりません');
        }
    
        // トランザクションで回答用紙と回答を更新
        await prisma.$transaction(async (tx) => {
            // 回答用紙を更新
            await tx.userAnswerSheet.update({
                where: { id: answerSheetId },
                data: { updatedAt: new Date() },
            });
    
            // 既存の回答を削除
            await tx.userAnswer.deleteMany({
                where: { answerSheetId },
            });
    
            // 新しい回答を一括作成
            const userAnswers = Object.entries(answers)
                .filter(([, answer]) => answer !== '')
                .map(([questionId, userAnswer]) => ({
                    answerSheetId,
                    questionId: parseInt(questionId, 10),
                    userAnswer,
                }));
    
            if (userAnswers.length > 0) {
                await tx.userAnswer.createMany({
                    data: userAnswers,
                });
            }
        });
    } catch (error) {
        console.error('Error saving user answer sheet:', error);
        return null;
    }

    revalidatePath(`/toeic_scoring_app/${testSetId}/${answerSheetId}`);
}

/**
 * ユーザー回答用紙を削除
 */
export async function deleteUserAnswerSheet(testSetId: string, answerSheetId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('認証が必要です');
    }

    try {
        // 回答用紙の存在確認と権限確認
        const existingSheet = await prisma.userAnswerSheet.findFirst({
            where: {
                id: answerSheetId,
                testSetId,
                userId: session.user.id,
            },
        });
    
        if (!existingSheet) {
            throw new Error('回答用紙が見つかりません');
        }
    
        // 関連するResultも削除される（onDelete: Cascade）
        await prisma.userAnswerSheet.delete({
            where: { id: answerSheetId },
        });
    } catch (error) {
        console.error('Error deleting user answer sheet:', error);
        return null;
    }

    revalidatePath(`/toeic_scoring_app/${testSetId}`);
}

