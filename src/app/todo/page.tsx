import { GoBackButton } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { TodoPage } from "@/features/todo/components/template/TodoPage";

export default function Page() {
    return (
        <>
            <div className="flex justify-between items-center">
                <GoBackButton />
                <ThemeToggle />
            </div>
            <h1 className="text-4xl mb-5 font-bold">Todo List</h1>
            <TodoPage />
        </>
    )
}