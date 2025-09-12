import { useState } from "react";
import { Todo as TodoType } from "@prisma/client";
import { createTodo } from "../../server-actions";

export function TodoForm({
    onAddTodo,
}: {
    onAddTodo: (todo: TodoType) => void
}) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = await createTodo(title);
        onAddTodo(newTodo);
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="border px-2 py-1 rounded"
                placeholder="Add a new todo"
            />
            <button 
                type="submit" 
                className="border px-2 py-1 rounded"
                disabled={title.trim() === ''}
            >Add</button>
        </form>
    )
}