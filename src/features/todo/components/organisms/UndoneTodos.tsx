import { useTodos } from "@/features/todo/context/TodosContext";
import { useState } from "react";

export function UndoneTodos() {
    const todos = useTodos();
    const undoneTodos = todos.filter((todo) => !todo.completed);

    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button 
                className="border m-4 px-2 py-1 rounded" 
                onClick={() => setIsOpen(true)}
            >
                See Undone Todos
            </button>
        )
    }

    if (undoneTodos.length === 0) {
        return (
            <div className="mt-8 p-4 border rounded flex justify-between items-center">
                <h2 className="text-2xl font-bold">You completed all todos!</h2>
                <button 
                    className="border px-2 py-1 rounded" 
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </button>
            </div>
        )
    }
    
    return (
        <>
            <div className="mt-8 p-4 border rounded">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Undone Todos</h2>
                    <button 
                        className="border mb-4 px-2 py-1 rounded" 
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
                <ul className="list-disc pl-5">
                    {undoneTodos.map((todo) => (
                        <li key={todo.id} className="mb-2 p-2">
                            <p className="font-bold">{todo.title}</p>
                            <p className="text-sm text-gray-500">{todo.createdAt.toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}