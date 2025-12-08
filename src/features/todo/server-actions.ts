"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { Todo } from "@prisma/client";
import { revalidateTag, revalidatePath } from "next/cache";
import { unstable_cache } from 'next/cache';

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
        revalidateTag(`${session.user.id}-todos`, 'max');
        revalidatePath('/todo');
    } catch (error) {
        console.error('Create error:', error);
        throw new Error('Failed to create todo');
    }
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
        revalidateTag(`${session.user.id}-todos`, 'max');
        revalidatePath('/todo');
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
        await prisma.todo.delete({
            where: { id },
        });
        revalidateTag(`${session.user.id}-todos`, 'max');
        revalidatePath('/todo');
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete todo');
    }
}

type GroupedTodos = {
    daily: Todo[];
    weekly: Todo[];
    monthly: Todo[];
    yearly: Todo[];
};

export async function getAllTodos(): Promise<GroupedTodos> {
    const session = await auth();
    if (!session?.user) {
        return { daily: [], weekly: [], monthly: [], yearly: [] };
    }

    const getCachedTodos = unstable_cache(
        async (userId: string) => {
            const todos: Todo[] = await prisma.todo.findMany({
                where: { userId },
                orderBy: { createdAt: 'asc' },
            });
            
            return todos.map(todo => ({
                ...todo,
                createdAt: new Date(todo.createdAt.getTime() - 9 * 60 * 60 * 1000),
                weekStart: todo.weekStart ? new Date(todo.weekStart.getTime() - 9 * 60 * 60 * 1000) : null,
                monthStart: todo.monthStart ? new Date(todo.monthStart.getTime() - 9 * 60 * 60 * 1000) : null,
                yearStart: todo.yearStart ? new Date(todo.yearStart.getTime() - 9 * 60 * 60 * 1000) : null,
            }));
        },
        [`${session.user.id}-todos`],
        { tags: [`${session.user.id}-todos`], revalidate: 60 }
    );

    const todos = await getCachedTodos(session.user.id);

    return {
        daily: todos.filter(t => t.type === 'daily'),
        weekly: todos.filter(t => t.type === 'weekly'),
        monthly: todos.filter(t => t.type === 'monthly'),
        yearly: todos.filter(t => t.type === 'yearly'),
    };
}