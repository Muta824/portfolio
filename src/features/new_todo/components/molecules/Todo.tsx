import { Todo as TodoType } from "@prisma/client";
import { updateTodo } from "../../server-actions";
import { useState } from "react";

export function Todo({ 
    todo, 
    onDeleteTodo, 
}: { 
    todo: TodoType, 
    onDeleteTodo: (id: string) => void, 
}) {
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    return (
        <div className="flex gap-2 px-2 py-1 my-2">
            <div className="flex items-center gap-2">
                <input 
                    type="checkbox" 
                    checked={completed}
                    className="border px-2 py-1 rounded w-5 h-5"
                    onChange={() => {
                        setCompleted(!completed);
                        updateTodo({ ...todo, completed: !completed });
                    }}
                />
                <input 
                    type="text" 
                    value={title}
                    className={`
                        border px-2 py-1 rounded 
                        ${completed ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}
                    `}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => updateTodo(todo)} 
                />
            </div>
            <button 
                className="bg-red-500 text-white border px-2 py-1 rounded"
                onClick={() => onDeleteTodo(todo.id)}
            >
                Delete
            </button>
        </div>
    )
}