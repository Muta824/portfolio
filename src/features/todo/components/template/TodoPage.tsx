"use client";

import { deleteTodo, getTodos } from "@/features/todo/server-actions";
import { TodoForm } from "../molecules/TodoForm";
import { useState, useEffect } from "react";
import { SelectedTodos } from "../organisms/SelectedTodos";
import { Spinner } from "@/components/atoms/Spinner";
import { Todo } from "@/features/todo/types/data";
import { TodosContext } from "@/features/todo/context/TodosContext";
import { UndoneTodos } from "../organisms/UndoneTodos";

export function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Todoを初回レンダリング時に取得
    useEffect(() => {
        getTodos()
            .then((todos) => setTodos(todos))
            .finally(() => setIsLoading(false));
    }, []);

    // ローディング中
    if (isLoading) {
        return <Spinner />;
    }
    
    // Todoを追加
    const handleAddTodo = (newTodo: Todo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    // Todoの完了状態を変更
    const handleToggleCompleted = (id: string) => {
        setTodos(prevTodos => prevTodos.map(todo => 
            todo.id === id 
                ? 
            { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Todoを削除
    const handleDeleteTodo = async (id: string) => {
        // クライアントサイドでTodoを削除
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        // サーバーサイドでTodoを削除
        await deleteTodo(id);
    };

    return (
        <TodosContext value={todos}>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
                {/* 日付を選択 */}
                <input 
                    type="date" 
                    value={selectedDate.toLocaleDateString('en-CA')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="border px-2 py-1 rounded"
                />
                {/* Todoを追加 */}
                <TodoForm onAddTodo={handleAddTodo} selectedDate={selectedDate} />
            </div>
            <SelectedTodos 
                todos={todos} 
                selectedDate={selectedDate}
                onToggleCompleted={handleToggleCompleted}
                onDeleteTodo={handleDeleteTodo} 
            />
            <UndoneTodos />
        </TodosContext>
    )
}