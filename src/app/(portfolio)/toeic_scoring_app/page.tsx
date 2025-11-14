import { TestSetSelector } from "@/features/toeic_scoring_app/components/organisms/TestSetSelector";
import { UserResult } from "@/features/toeic_scoring_app/components/organisms/UserResult";
import { AIadvice } from "@/features/toeic_scoring_app/components/organisms/AIadvice";

export default function ToeicScoringAppPage() {
    return (
        <div>
            <TestSetSelector />
            <UserResult />
            <AIadvice />
        </div>
    )
}