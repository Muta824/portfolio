import { BackToHome } from "@/components/atoms/BackToHome";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { TodoPage } from "@/features/todo/components/organisms/TodoPage";

export default function Page() {
    return (
        <>
            <div className="flex justify-between items-center">
                <BackToHome />
                <ThemeToggle />
            </div>
            <h1 className="text-4xl mb-5 font-bold">Todo List</h1>
            <TodoPage />
        </>
    )
}