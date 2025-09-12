"use client";

import { Todo as TodoType } from "@prisma/client";
import { Todo } from "../molecules/Todo";
import { useEffect, useState } from "react";
import { deleteTodo, getTodos } from "@/features/new_todo/server-actions";
import { TodoForm } from "../molecules/TodoForm";

export function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    
    useEffect(() => {
        getTodos().then((todos) => setTodos(todos));
    }, []);

    const handleAddTodo = (newTodo: TodoType) => {
        setTodos(prev => [newTodo, ...prev]);
    };

    const handleDeleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        deleteTodo(id);
    }

    return (
        <div>
            <TodoForm onAddTodo={handleAddTodo} />
            {todos.map((todo) => (
                <Todo 
                    key={todo.id} 
                    todo={todo} 
                    onDeleteTodo={handleDeleteTodo} 
                />
            ))}
        </div>
    )
}