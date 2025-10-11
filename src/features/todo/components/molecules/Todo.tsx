import { Todo as TodoType } from "@/features/todo/types/data";
import { updateTodo } from "../../server-actions";
import { useState } from "react";

export function Todo({ 
    todo, 
    onToggleCompleted,
    onDeleteTodo,
}: { 
    todo: TodoType, 
    onToggleCompleted: (id: string) => void,
    onDeleteTodo: (id: string) => void,
}) {
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    const handleCompletedChange = async () => {
        // Todoコンポーネントで完了状態を変更
        const newCompleted = !completed;
        setCompleted(newCompleted);
        // 全体のTodoリストにも完了状態を反映
        onToggleCompleted(todo.id);
        // サーバーサイドで完了状態を更新
        await updateTodo({ ...todo, completed: newCompleted });
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
                        ${completed ? 'bg-green-500 dark:bg-green-700 text-white' : ''}
                    `}
                    disabled={completed}
                    onChange={(e) => setTitle(e.target.value)}
                    // フォーカスが外れたら、サーバーサイドでtodoのタイトルを更新
                    onBlur={() => updateTodo({ ...todo, title: title })}
                />
            </div>
            <button 
                className="text-white border px-2 py-1 rounded cursor-pointer bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={() => onDeleteTodo(todo.id)}
            >
                Delete
            </button>
        </div>
    )
}