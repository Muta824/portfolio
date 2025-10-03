"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { Todo } from "@prisma/client";

type ClientTodoInput = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
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
                userId: session.user.id,
            },
        });
    } catch (error) {
        console.error('Create error:', error);
        throw new Error('Failed to create todo');
    }
}

export async function getTodos(): Promise<Todo[]> {
    const session = await auth();
    // ユーザーがログインしていない場合は空の配列を返す
    if (!session?.user) {
        return [];
    }
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        // 日本時間に修正
        const adjustedTodos = todos.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt.getTime() - 9 * 60 * 60 * 1000),
        }));
        return adjustedTodos;
    } catch (error) {
        console.error('Get todos error:', error);
        throw new Error('Failed to get todos');
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
    try {
        await prisma.todo.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete todo');
    }
}