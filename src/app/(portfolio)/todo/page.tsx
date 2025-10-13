import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { TodoPage } from "@/features/todo/components/template/TodoPage";
import { WeeklyTodos } from "@/features/todo/components/organisms/WeeklyTodos";
import { MonthlyTodos } from "@/features/todo/components/organisms/MonthlyTodos";
import { YearlyTodos } from "@/features/todo/components/organisms/YearlyTodos";

export default function Page() {
    return (
        <>
            <div className="flex justify-between items-center">
                <GoBackLink />
                <ThemeToggle />
            </div>
            <h1 className="text-4xl mb-5 font-bold">Todo List</h1>
            <TodoPage />
            <WeeklyTodos />
            <MonthlyTodos />
            <YearlyTodos />
        </>
    )
}