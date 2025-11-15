import { generateQuestions } from "@/features/toeic_scoring_app/utils/questionsGenerator";
import { TestSetQuestions } from "@/features/toeic_scoring_app/components/templates/TestSetQuestions";
import { TestSetPageHeader } from "@/features/toeic_scoring_app/components/organisms/TestSetPageHeader";

export default async function TestSetPage({ params }: { params: Promise<{ id: string, answerSheetId: string }> }) {
    const { id, answerSheetId } = await params;
    const questions = generateQuestions(id);
    
    return (
        <div className="p-4 space-y-6">
            <TestSetPageHeader testSetId={id} answerSheetId={answerSheetId} />
            <TestSetQuestions testSetId={id} answerSheetId={answerSheetId} questions={questions} />
        </div>
    )
}