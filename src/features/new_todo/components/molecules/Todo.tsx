import { Todo as TodoType } from "@prisma/client";

export function Todo({ todo }: { todo: TodoType }) {
    return (
        <li key={todo.id}>{todo.title}</li>
    )
}