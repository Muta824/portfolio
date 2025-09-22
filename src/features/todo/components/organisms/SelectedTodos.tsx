import { Todo } from "../molecules/Todo";
import { Todo as TodoType } from "@prisma/client";

const isSameDay = (d1: Date, d2: Date) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

export function SelectedTodos({ 
    todos, 
    selectedDate,
    onToggleCompleted,
    onDeleteTodo,
}: { 
    todos: TodoType[], 
    selectedDate: Date,
    onToggleCompleted: (id: string) => void,
    onDeleteTodo: (id: string) => void 
}) {
    // 選択した日付のTodoを取得
    const filteredTodos = todos.filter((todo) => isSameDay(todo.createdAt, selectedDate));

    return (
        <>
            {filteredTodos.map((todo) => (
                <Todo 
                    key={todo.id} 
                    todo={todo} 
                    onToggleCompleted={onToggleCompleted}
                    onDeleteTodo={onDeleteTodo} 
                />
            ))}
        </>
    )
}