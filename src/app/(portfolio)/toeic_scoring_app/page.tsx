import { TestSetSelector } from "@/features/toeic_scoring_app/components/organisms/TestSetSelector";
import { UserResult } from "@/features/toeic_scoring_app/components/organisms/UserResult";
import { AIadvice } from "@/features/toeic_scoring_app/components/organisms/AIadvice";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

export default function ToeicScoringAppPage() {
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <GoBackLink />
                <ThemeToggle />
            </div>
            <TestSetSelector />
            <UserResult />
            <AIadvice />
        </div>
    )
}