import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { DailyTodos } from "@/features/todo/components/template/DailyTodos";
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
            <h1 className="text-4xl mb-8 font-bold">Todo List</h1>
            <div className="flex flex-col lg:flex-row-reverse justify-center gap-4">
                <DailyTodos />
                <div className="w-full lg:w-1/3 space-y-8 mb-6">
                    <WeeklyTodos />
                    <MonthlyTodos />
                    <YearlyTodos />
                </div>
            </div>
        </>
    )
}