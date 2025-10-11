"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { Todo } from "@prisma/client";

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
    } catch (error) {
        console.error('Create error:', error);
        throw new Error('Failed to create todo');
    }
}

export async function getDailyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'daily',
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
}

export async function getWeeklyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'weekly',
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
        console.error('Get all weekly todos error:', error);
        throw new Error('Failed to get all weekly todos');
    }
}

export async function getMonthlyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'monthly',
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
        console.error('Get all monthly todos error:', error);
        throw new Error('Failed to get all monthly todos');
    }
}

export async function getYearlyTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'yearly',
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
        console.error('Get all yearly todos error:', error);
        throw new Error('Failed to get all yearly todos');
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
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete todo');
    }
}