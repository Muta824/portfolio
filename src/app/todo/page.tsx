import { TodoList } from "@/features/todo/components/organisms/TodoList";

export default function Page() {
    return (
        <>
            <h1 className="text-2xl mb-5 font-bold">Todo List</h1>
            <TodoList />
        </>
    )
}