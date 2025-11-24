'use server';

import prisma from '@/lib/prisma/prisma';
import type { TestSet } from '../types/data';

/**
 * Get test sets list
 */
export async function getTestSets(): Promise<TestSet[]> {
    try {
        const testSets = await prisma.testSet.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    
        return testSets;
    } catch (error) {
        console.error('Error getting test sets:', error);
        return [];
    }
}

/**
 * Get test set by ID
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
