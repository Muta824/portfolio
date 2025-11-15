import { Text } from "@/components/atoms/Text";
import { generateQuestions } from "@/features/toeic_scoring_app/utils/questionsGenerator";
import { TestSetQuestions } from "@/features/toeic_scoring_app/components/organisms/TestSetQuestions";

export default async function ToeicScoringAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const questions = generateQuestions(id);
    
    return (
        <div className="p-4 space-y-6 max-w-6xl mx-auto">
            <Text variant="h2">Test Set {id}</Text>
            <TestSetQuestions testSetId={id} questions={questions} />
        </div>
    )
}