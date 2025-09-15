import { Todo as TodoType } from "@prisma/client";
import { updateTodo } from "../../server-actions";
import { useState } from "react";

export function Todo({ 
    todo, 
    onDeleteTodo,
    //onUpdateTodo,
}: { 
    todo: TodoType, 
    onDeleteTodo: (id: string) => void,
    //onUpdateTodo: (todo: TodoType) => void,
}) {
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    const handleCompletedChange = async () => {
        const newCompleted = !completed;
        setCompleted(newCompleted);
        await updateTodo({ ...todo, completed: newCompleted });
    };

    const handleTitleBlur = async () => {
        await updateTodo({ ...todo, title: title });
    };

    return (
        <div className="flex gap-2 px-2 py-1 my-2">
            <div className="flex flex-1 items-center gap-2">
                <input 
                    type="checkbox" 
                    checked={completed}
                    className="border px-2 py-1 rounded w-5 h-5"
                    onChange={handleCompletedChange}
                />
                <input 
                    type="text" 
                    value={title}
                    className={`
                        flex-1 border px-2 py-1 rounded 
                        ${completed ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}
                    `}
                    disabled={completed}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
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