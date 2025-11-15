import { Text } from "@/components/atoms/Text";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { UserAnswerSheetSelector } from "@/features/toeic_scoring_app/components/organisms/UserAnswerSheetSelector";

export default async function ToeicScoringAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <GoBackLink href="toeic_scoring_app" />
                <ThemeToggle />
            </div>
            <Text variant="h1">Test Set {id}</Text>
            <UserAnswerSheetSelector testSetId={id} />
        </div>
    )
}