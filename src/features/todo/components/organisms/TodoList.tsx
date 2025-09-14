import { TodoPage } from "./TodoPage";
import { getTodos } from "../../server-actions";

export async function TodoList() {
    const todos = await getTodos();
    return (
        <TodoPage initialTodos={todos} />
    )
}