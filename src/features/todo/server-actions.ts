"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { Todo } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

type ClientTodoInput = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    type?: string;
    weekStart?: Date | null;
    monthStart?: Date | null;
    yearStart?: Date | null;
}

export async function createTodo(todo: ClientTodoInput): Promise<void> {
    const session = await auth();
    // ユーザーがログインしていない場合はdbに保存しない
    if (!session?.user) {
        return;
    }
    try {
        await prisma.todo.create({
            data: {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                // 日本時間に直す
                createdAt: new Date(todo.createdAt.getTime() + 9 * 60 * 60 * 1000),
                type: todo.type || 'daily',
                weekStart: todo.weekStart ? new Date(todo.weekStart.getTime() + 9 * 60 * 60 * 1000) : null,
                monthStart: todo.monthStart ? new Date(todo.monthStart.getTime() + 9 * 60 * 60 * 1000) : null,
                yearStart: todo.yearStart ? new Date(todo.yearStart.getTime() + 9 * 60 * 60 * 1000) : null,
                userId: session.user.id,
            },
        });
        revalidateTag(`${session.user.id}-${todo.type}-todos`);
    } catch (error) {
        console.error('Create error:', error);
        throw new Error('Failed to create todo');
    }
}

// タイプごとにTodoを取得する関数
// unstable_cacheを使用してキャッシュを利用する
const getTodosByType = (userId: string, type: string) => unstable_cache(
    async (): Promise<Todo[]> => {
        try {
            const todos = await prisma.todo.findMany({
                where: {
                    userId,
                    type,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
            // 日本時間に修正
            const adjustedTodos = todos.map(todo => ({
                ...todo,
                createdAt: new Date(todo.createdAt.getTime() - 9 * 60 * 60 * 1000),
                weekStart: todo.weekStart ? new Date(todo.weekStart.getTime() - 9 * 60 * 60 * 1000) : null,
                monthStart: todo.monthStart ? new Date(todo.monthStart.getTime() - 9 * 60 * 60 * 1000) : null,
                yearStart: todo.yearStart ? new Date(todo.yearStart.getTime() - 9 * 60 * 60 * 1000) : null,
            }));
            return adjustedTodos;
        } catch (error) {
            console.error('Get todos error:', error);
            throw new Error('Failed to get todos');
        }
    },
    [`${userId}-${type}-todos`],
    { tags: [`${userId}-${type}-todos`] }
);

export async function getDailyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    return getTodosByType(session.user.id, 'daily')();
}

export async function getWeeklyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    return getTodosByType(session.user.id, 'weekly')();
}

export async function getMonthlyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    return getTodosByType(session.user.id, 'monthly')();
}

export async function getYearlyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    return getTodosByType(session.user.id, 'yearly')();
}

export async function updateTodo(todo: ClientTodoInput): Promise<void> {
    const session = await auth();
    if (!session?.user) {
        return;
    }
    try {
        await prisma.todo.update({
            where: { id: todo.id },
            data: {
                title: todo.title,
                completed: todo.completed,
            },
        });
        revalidateTag(`${session.user.id}-${todo.type}-todos`);
    } catch (error) {
        console.error('Update error:', error);
        throw new Error('Failed to update todo');
    }
}

export async function deleteTodo(id: string): Promise<void> {
    const session = await auth();
    if (!session?.user) {
        return;
    }
    try {
        const todo = await prisma.todo.delete({
            where: { id },
        });
        revalidateTag(`${session.user.id}-${todo.type}-todos`);
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete todo');
    }
}