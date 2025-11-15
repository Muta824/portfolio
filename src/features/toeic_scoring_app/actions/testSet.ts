'use server';

import prisma from '@/lib/prisma/prisma';

/**
 * テストセット一覧を取得
 */
export async function getTestSets() {
    try {
        const testSets = await prisma.testSet.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    
        return testSets;
    } catch (error) {
        console.error('Error getting test sets:', error);
        return [];
    }
}

/**
 * テストセットを取得（IDで）
 */
export async function getTestSet(testSetId: string) {
    try {
        const testSet = await prisma.testSet.findUnique({
            where: {
                id: testSetId,
            },
            include: {
                questions: {
                    orderBy: {
                        qId: 'asc',
                    },
                },
            },
        });
    
        return testSet;
    } catch (error) {
        console.error('Error getting test set:', error);
        return null;
    }
}
