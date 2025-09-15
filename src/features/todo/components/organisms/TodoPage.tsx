"use client";

import { Todo as TodoType } from "@prisma/client";
import { Todo } from "../molecules/Todo";
import { deleteTodo, getTodos } from "@/features/todo/server-actions";
import { TodoForm } from "../molecules/TodoForm";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";

const isSameDay = (d1: Date, d2: Date) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

export function TodoPage() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Todoを初回レンダリング時に取得
    useEffect(() => {
        getTodos()
            .then((todos) => setTodos(todos))
            .finally(() => setIsLoading(false));
    }, []);

    // ローディング中
    if (isLoading) {
        return <Loading />;
    }
    
    // Todoを追加
    const handleAddTodo = (newTodo: TodoType) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    // Todoを削除
    const handleDeleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        deleteTodo(id);
    };

    // 選択した日付のTodoを取得
    const filteredTodos = todos.filter((todo) => isSameDay(todo.createdAt, selectedDate));

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
                {/* 日付を選択 */}
                <input 
                    type="date" 
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="border px-2 py-1 rounded"
                />
                {/* Todoを追加 */}
                <TodoForm onAddTodo={handleAddTodo} selectedDate={selectedDate} />
                {/* 完了したTodo */}
                <p className="px-2 py-1">
                    {filteredTodos.filter((todo) => todo.completed).length} / {filteredTodos.length} completed
                </p>
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