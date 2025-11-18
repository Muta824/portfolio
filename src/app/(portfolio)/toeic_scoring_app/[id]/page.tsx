import { Text } from "@/components/atoms/Text";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { UserAnswerSheetSelector } from "@/features/toeic_scoring_app/components/organisms/UserAnswerSheetSelector";
import { getTestSet } from "@/features/toeic_scoring_app/actions/testSet";

export default async function ToeicScoringAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const testSet = await getTestSet(id);

    if (!testSet) {
        return (
            <div>
                <Text variant="h1">Test Set not found</Text>
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <GoBackLink href="toeic_scoring_app" >Back to TOEIC Scoring App</GoBackLink>
                <ThemeToggle />
            </div>
            <Text variant="h1">{testSet?.name}</Text>
            <UserAnswerSheetSelector testSetId={id} />
        </div>
    )
}