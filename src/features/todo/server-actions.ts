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

export async function getWeeklyTodos(weekStart: Date): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        // 日本時間に変換
        const adjustedWeekStart = new Date(weekStart.getTime() + 9 * 60 * 60 * 1000);
        
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'weekly',
                weekStart: adjustedWeekStart,
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
        console.error('Get weekly todos error:', error);
        throw new Error('Failed to get weekly todos');
    }
}

export async function getMonthlyTodos(monthStart: Date): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        // 日本時間に変換
        const adjustedMonthStart = new Date(monthStart.getTime() + 9 * 60 * 60 * 1000);
        
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'monthly',
                monthStart: adjustedMonthStart,
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
        console.error('Get monthly todos error:', error);
        throw new Error('Failed to get monthly todos');
    }
}

export async function getYearlyTodos(yearStart: Date): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        // 日本時間に変換
        const adjustedYearStart = new Date(yearStart.getTime() + 9 * 60 * 60 * 1000);
        
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
                type: 'yearly',
                yearStart: adjustedYearStart,
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
        console.error('Get yearly todos error:', error);
        throw new Error('Failed to get yearly todos');
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