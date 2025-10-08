import { useTodos } from "@/features/todo/context/TodosContext";
import { useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export function UndoneTodos() {
    const todos = useTodos();
    const undoneTodos = todos.filter((todo) => !todo.completed);

    const [isOpen, setIsOpen] = useState(false);

    if (todos.length === 0) {
        return null;
    }

    if (!isOpen) {
        return (
            <div className="mt-8 min-h-screen">
                <button 
                    className="border my-4 p-2 rounded w-full flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <p className="mx-2 font-bold text-2xl">
                        See Undone Todos
                    </p>
                    <ArrowDownwardIcon className="mx-2"/>
                </button>
            </div>
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
            <div className="mt-8 mb-4 p-4 border rounded">
                <div className="mb-4 flex justify-between items-center">
                    <p className="font-bold text-2xl">Undone Todos</p>
                    <button 
                        className="border py-1 px-2 rounded flex justify-between items-center cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <p className="font-bold text-xl">
                            Close
                        </p>
                        <ArrowUpwardIcon className="ml-2"/>
                    </button>
                </div>
                <ul className="list-disc pl-5">
                    {undoneTodos.map((todo) => (
                        <li key={todo.id} className="mb-2 p-2">
                            <p className="font-bold">{todo.title}</p>
                            <p className="mt-1 text-sm text-gray-400">{todo.createdAt.toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}