import { Todo } from "../molecules/Todo";
import { getTodos } from "@/features/new_todo/server-actions";

export async function TodoList() {
    const todos = await getTodos();

    return (
        <ul>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}