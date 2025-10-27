import { Todo } from "../molecules/Todo";
import { Todo as TodoType } from "@/features/todo/types/data";
import { isSameDay } from "date-fns";

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