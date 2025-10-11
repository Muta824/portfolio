"use client";

import { useState, useEffect } from "react";
import { startOfYear, addYears, format, isSameDay } from "date-fns";
import { getYearlyTodos, createTodo, updateTodo, deleteTodo } from "@/features/todo/server-actions";
import { Todo as TodoType } from "@/features/todo/types/data";
import { Todo } from "@/features/todo/components/molecules/Todo";
import { TodosSkeleton } from "@/features/todo/components/organisms/TodosSkeleton";
import cuid from "cuid";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export function YearlyTodos() {
    const [currentYear, setCurrentYear] = useState<Date>(new Date());
    const [allTodos, setAllTodos] = useState<TodoType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");

    // 年の開始日を計算
    const yearStart = startOfYear(currentYear);

    // 全ての年のTodosを初回レンダリング時に取得
    useEffect(() => {
        setIsLoading(true);
        getYearlyTodos()
            .then((todos) => setAllTodos(todos))
            .finally(() => setIsLoading(false));
    }, []);

    const filteredTodos = allTodos.filter(todo => todo.yearStart && isSameDay(todo.yearStart, yearStart));

    // 年のTodoを追加
    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;

        const newTodo = {
            id: cuid(),
            title: newTodoTitle,
            completed: false,
            createdAt: new Date(),
            type: 'yearly',
            yearStart: yearStart,
        };

        // クライアントサイドで即座に反映
        setAllTodos(prevTodos => [...prevTodos, newTodo]);
        setNewTodoTitle("");

        // サーバーサイドで保存
        await createTodo(newTodo);
    };

    // Todoの完了状態を変更
    const handleToggleCompleted = async (id: string) => {
        const updatedTodos = allTodos.map(todo => 
            todo.id === id 
                ? { ...todo, completed: !todo.completed } 
                : todo
        );
        setAllTodos(updatedTodos);
        
        // サーバーサイドで更新
        const todoToUpdate = updatedTodos.find(t => t.id === id);
        if (todoToUpdate) {
            await updateTodo(todoToUpdate);
        }
    };

    // Todoを削除
    const handleDeleteTodo = async (id: string) => {
        setAllTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        await deleteTodo(id);
    };

    // 前の年へ移動
    const handlePreviousYear = () => {
        setCurrentYear(prevYear => addYears(prevYear, -1));
    };

    // 次の年へ移動
    const handleNextYear = () => {
        setCurrentYear(prevYear => addYears(prevYear, 1));
    };

    if (isLoading) {
        return <TodosSkeleton />;
    }

    return (
        <div className="mt-8 p-4 border rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Yearly Todos</h2>
            
            {/* 年のナビゲーション */}
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={handlePreviousYear}
                    className="px-2 py-1 bg-blue-500 text-white flex items-center gap-1 cursor-pointer rounded hover:bg-blue-600"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                </button>
                
                <div className="text-lg font-semibold">
                    {format(yearStart, 'yyyy')}
                </div>
                
                <button 
                    onClick={handleNextYear}
                    className="px-2 py-1 bg-blue-500 text-white flex items-center gap-1 cursor-pointer rounded hover:bg-blue-600"
                >
                    <ArrowRightIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Todo追加フォーム */}
            <form onSubmit={handleAddTodo} className="mb-4 flex gap-2">
                <input 
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Add Yearly Todo..."
                    className="flex-1 border px-3 py-2 rounded"
                />
                <button 
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-600"
                >
                    Add
                </button>
            </form>

            {/* Todosリスト */}
            <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                    <p className="text-xl text-gray-500">No Yearly Todos</p>
                ) : (
                    filteredTodos.map((todo) => (
                        <Todo 
                            key={todo.id} 
                            todo={todo} 
                            onToggleCompleted={handleToggleCompleted}
                            onDeleteTodo={handleDeleteTodo} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}