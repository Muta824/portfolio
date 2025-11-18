import { TestSetSelection } from "@/features/toeic_scoring_app/components/organisms/TestSetSelection";
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
            <TestSetSelection />
            <UserResult />
            <AIadvice />
        </div>
    )
}