"use client";

import { Todo as TodoType } from "@prisma/client";
import { Todo } from "../molecules/Todo";
import { useState } from "react";
import { deleteTodo } from "@/features/todo/server-actions";
import { TodoForm } from "../molecules/TodoForm";

const isSameDay = (d1: Date, d2: Date) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

export function TodoPage({initialTodos}: {initialTodos: TodoType[]}) {
    const [todos, setTodos] = useState<TodoType[]>(initialTodos);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    
    // Todoを追加
    const handleAddTodo = (newTodo: TodoType) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    // Todoを更新
    //const handleUpdateTodo = (updatedTodo: TodoType) => {
    //    setTodos(prevTodos => prevTodos.map(todo => 
    //        todo.id === updatedTodo.id ? updatedTodo : todo
    //    ));
    //};

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
                    //onUpdateTodo={handleUpdateTodo}
                />
            ))}
        </div>
    )
}