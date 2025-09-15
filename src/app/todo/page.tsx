import { TodoPage } from "@/features/todo/components/organisms/TodoPage";
import { BackToHome } from "@/components/atoms/BackToHome";

export default async function Page() {
    
    return (
        <>
            <BackToHome />
            <h1 className="text-4xl mb-5 font-bold">Todo List</h1>
            <TodoPage />
        </>
    )
}