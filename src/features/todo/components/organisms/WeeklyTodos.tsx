"use client";

import { useState } from "react";
import { startOfWeek, endOfWeek, addWeeks, format, isSameDay } from "date-fns";
import { createTodo, updateTodo, deleteTodo } from "@/features/todo/server-actions";
import { Todo as TodoType } from "@/features/todo/types/data";
import { Todo } from "@/features/todo/components/molecules/Todo";
import cuid from "cuid";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type Props = {
    initialTodos: TodoType[];
};

export function WeeklyTodos({ initialTodos }: Props) {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
    const [allTodos, setAllTodos] = useState<TodoType[]>(initialTodos);
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");

    // 週の開始日と終了日を計算（月曜始まり）
    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

    const filteredTodos = allTodos.filter(todo => todo.weekStart && isSameDay(todo.weekStart, weekStart));

    // 週のTodoを追加
    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;

        const newTodo = {
            id: cuid(),
            title: newTodoTitle,
            completed: false,
            createdAt: new Date(),
            type: 'weekly',
            weekStart: weekStart,
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

    // 前の週へ移動
    const handlePreviousWeek = () => {
        setCurrentWeek(prevWeek => addWeeks(prevWeek, -1));
    };

    // 次の週へ移動
    const handleNextWeek = () => {
        setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
    };

    return (
        <div className="p-4 border rounded-lg ">
            <h2 className="text-2xl text-center font-bold mb-4">Weekly Todos</h2>
            
            {/* 週のナビゲーション */}
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={handlePreviousWeek}
                    className="px-2 py-1 bg-blue-500 text-white flex items-center gap-1 cursor-pointer rounded hover:bg-blue-600"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                </button>
                
                <div className="text-lg font-semibold">
                    {format(weekStart, 'yyyy/MM/dd')} - {format(weekEnd, 'yyyy/MM/dd')}
                </div>
                
                <button 
                    onClick={handleNextWeek}
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
                    placeholder="Add Weekly Todo..."
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
                    <p className="text-xl text-gray-500">No Weekly Todos</p>
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