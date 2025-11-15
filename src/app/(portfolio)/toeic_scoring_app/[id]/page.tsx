import { Text } from "@/components/atoms/Text";
import { generateQuestions } from "@/features/toeic_scoring_app/utils/questionsGenerator";
import { TestSetQuestions } from "@/features/toeic_scoring_app/components/organisms/TestSetQuestions";
import { GoBackLink } from "@/components/atoms/GoBackLink";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

export default async function ToeicScoringAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const questions = generateQuestions(id);
    
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <GoBackLink href="toeic_scoring_app" />
                <ThemeToggle />
            </div>
            <Text variant="h1">Test Set {id}</Text>
            <TestSetQuestions testSetId={id} questions={questions} />
        </div>
    )
}