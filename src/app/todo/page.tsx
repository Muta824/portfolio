import { TodoList } from "@/features/todo/components/organisms/TodoList";
import { BackToHome } from "@/components/atoms/BackToHome";

export default function Page() {
    return (
        <>
            <BackToHome />
            <h1 className="text-4xl mb-5 font-bold">Todo List</h1>
            <TodoList />
        </>
    )
}