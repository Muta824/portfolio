import { TodoPage } from "@/features/todo/components/organisms/TodoPage";
import { BackToHome } from "@/components/atoms/BackToHome";
import { getTodos } from "@/features/todo/server-actions";
import { Suspense } from "react";
import Loading from "../loading";

export default async function Page() {
    const todos = getTodos();
    
    return (
        <>
            <BackToHome />
            <h1 className="text-4xl mb-5 font-bold">Todo List</h1>
            <Suspense fallback={<Loading />}>
                <TodoPage initialTodos={todos} />
            </Suspense>
        </>
    )
}