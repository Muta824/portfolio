"use client";

import { Todo as TodoType } from "@prisma/client";
import { Todo } from "../molecules/Todo";
import { useEffect, useState } from "react";
import { deleteTodo, getTodos } from "@/features/todo/server-actions";
import { TodoForm } from "../molecules/TodoForm";

const isSameDay = (d1: Date, d2: Date) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

export function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    
    // 初回レンダリング時にTodoを取得
    useEffect(() => {
        getTodos().then((todos) => setTodos(todos));
    }, []);

    // Todoを追加
    const handleAddTodo = (newTodo: TodoType) => {
        setTodos(prev => [newTodo, ...prev]);
    };

    // Todoを削除
    const handleDeleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        deleteTodo(id);
    };

    const filteredTodos = todos.filter((todo) => isSameDay(todo.createdAt, selectedDate));

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <input 
                    type="date" 
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="border px-2 py-1 rounded"
                />
                <TodoForm onAddTodo={handleAddTodo} />
            </div>
            {filteredTodos.map((todo) => (
                <Todo 
                    key={todo.id} 
                    todo={todo} 
                    onDeleteTodo={handleDeleteTodo} 
                />
            ))}
        </div>
    )
}