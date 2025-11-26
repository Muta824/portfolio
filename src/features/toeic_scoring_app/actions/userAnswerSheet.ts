'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma/prisma';
import { revalidatePath } from 'next/cache';
import type { Prisma } from '@prisma/client';

/**
 * Get user answer sheets list
 */
export async function getUserAnswerSheets(testSetId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.error('Authentication required');
            return [];
        }

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
    
        // Transform to UserAnswerSheet type
        return answerSheets.map((sheet: Prisma.UserAnswerSheetGetPayload<{ include: { userAnswers: true } }>) => ({
            id: sheet.id,
            testSetId: sheet.testSetId,
            name: sheet.name,
            userId: sheet.userId,
            createdAt: sheet.createdAt,
            updatedAt: sheet.updatedAt,
            answers: sheet.userAnswers.reduce((acc: Record<number, string>, answer: { questionId: number; userAnswer: string | null }) => {
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
 * Get user answer sheet by ID
 */
export async function getUserAnswerSheet(testSetId: string, answerSheetId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.error('Authentication required');
            return null;
        }

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
            answers: answerSheet.userAnswers.reduce((acc: Record<number, string>, answer: { questionId: number; userAnswer: string | null }) => {
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
 * Create a new user answer sheet
 */
export async function createUserAnswerSheet(testSetId: string, name: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.error('Authentication required');
            return null;
        }

        const answerSheet = await prisma.userAnswerSheet.create({
            data: {
                testSetId,
                name,
                userId: session.user.id,
            },
        });
    
        revalidatePath(`/toeic_scoring_app/${testSetId}`);
        
        // Transform to UserAnswerSheet type
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
 * Save user answer sheet (including answers)
 */
export async function saveUserAnswerSheet(
    testSetId: string,
    answerSheetId: string,
    answers: Record<number, string>
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.error('Authentication required');
            return null;
        }

        // Check if answer sheet exists and verify permissions
        const existingSheet = await prisma.userAnswerSheet.findFirst({
            where: {
                id: answerSheetId,
                testSetId,
                userId: session.user.id,
            },
        });
    
        if (!existingSheet) {
            throw new Error('Answer sheet not found');
        }
    
        // Update answer sheet and answers in a transaction
        await prisma.$transaction(async (tx) => {
            // Update answer sheet
            await tx.userAnswerSheet.update({
                where: { id: answerSheetId },
                data: { updatedAt: new Date() },
            });
    
            // Delete existing answers
            await tx.userAnswer.deleteMany({
                where: { answerSheetId },
            });
    
            // Create new answers in bulk
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
 * Update user answer sheet name
 */
export async function updateUserAnswerSheetName(testSetId: string, answerSheetId: string, name: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.error('Authentication required');
            return null;
        }

        // Update answer sheet name
        await prisma.userAnswerSheet.update({
            where: { id: answerSheetId },
            data: { name },
        });
    } catch (error) {
        console.error('Error updating user answer sheet name:', error);
        return null;
    }

    revalidatePath(`/toeic_scoring_app/${testSetId}/${answerSheetId}`);
}

/**
 * Delete user answer sheet
 */
export async function deleteUserAnswerSheet(testSetId: string, answerSheetId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.error('Authentication required');
            return null;
        }

        // Check if answer sheet exists and verify permissions
        const existingSheet = await prisma.userAnswerSheet.findFirst({
            where: {
                id: answerSheetId,
                testSetId,
                userId: session.user.id,
            },
        });
    
        if (!existingSheet) {
            throw new Error('Answer sheet not found');
        }
    
        // Related Results will also be deleted (onDelete: Cascade)
        await prisma.userAnswerSheet.delete({
            where: { id: answerSheetId },
        });
    } catch (error) {
        console.error('Error deleting user answer sheet:', error);
        return null;
    }

    revalidatePath(`/toeic_scoring_app/${testSetId}`);
}

