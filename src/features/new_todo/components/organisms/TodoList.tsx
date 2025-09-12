import { Todo as TodoType } from "@prisma/client";
import { Todo } from "../molecules/Todo";
import { useEffect, useState } from "react";
import { getTodos } from "@/features/new_todo/server-actions";
import { TodoForm } from "../molecules/TodoForm";

export function TodoList() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    
    useEffect(() => {
        getTodos().then((todos) => setTodos(todos));
    }, []);

    const handleAddTodo = (newTodo: TodoType) => {
        setTodos(prev => [newTodo, ...prev]);
    };

    return (
        <div>
            <TodoForm onAddTodo={handleAddTodo} />
            <ul>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}