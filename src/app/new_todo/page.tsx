import { TodoList } from "@/features/new_todo/components/organisms/TodoList";

export default async function Page() {

    return (
        <>
            <h1 className="text-2xl mb-4 font-bold">Todo App</h1>
            <TodoList />
        </>
    )
}