import { useState } from "react";
import { Todo as TodoType } from "@prisma/client";
import { createTodo } from "../../server-actions";
import cuid from "cuid";

export function TodoForm({
    onAddTodo,
    selectedDate,
}: {
    onAddTodo: (todo: TodoType) => void
    selectedDate: Date
}) {
    const [title, setTitle] = useState('');

    // Todoを追加
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTitle('');
        
        // 選択された日付に現在の時間を設定
        const now = new Date();
        const todoDate = new Date(selectedDate);
        todoDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        
        const newTodo = {
            id: cuid(),
            title: title,
            completed: false,
            createdAt: todoDate,
        }
        // クライアントサイドでTodoを追加
        onAddTodo(newTodo);
        // サーバーサイドでTodoを追加
        await createTodo(newTodo);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 border px-2 py-1 rounded"
                placeholder="Add a new todo"
            />
            <button 
                type="submit" 
                className="border px-2 py-1 rounded"
                // 入力が空の場合はボタンを無効化
                disabled={title.trim() === ''}
            >
                Add
            </button>
        </form>
    )
}