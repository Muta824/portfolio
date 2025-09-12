"use server";

import prisma from "@/lib/prisma/prisma";
import { Todo } from "@prisma/client";

export async function createTodo(todo: Todo): Promise<Todo> {
    try {
        const newTodo = await prisma.todo.create({
            data: todo,
        });
        return newTodo;
    } catch (error) {
        console.error('Create error:', error);
        throw new Error('Failed to create todo');
    }
}

export async function getTodos(): Promise<Todo[]> {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return todos;
    } catch (error) {
        console.error('Get todos error:', error);
        throw new Error('Failed to get todos');
    }
}

export async function updateTodo(todo: Todo): Promise<Todo> {
    try {
        const updatedTodo = await prisma.todo.update({
            where: { id: todo.id },
            data: {
                title: todo.title,
                completed: todo.completed,
            },
        });
        return updatedTodo;
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