import { Text } from "@/components/atoms/Text";
import { TestResult } from "@/features/toeic_scoring_app/components/organisms/TestResult";

export default async function TestResultPage({ 
    params 
}: { 
    params: Promise<{ id: string; answerSheetId: string }> 
}) {
    const { id, answerSheetId } = await params;
    
    return (
        <div className="p-4 space-y-6">
            <Text variant="h1">Test Result - Set {id}</Text>
            <TestResult testSetId={id} answerSheetId={answerSheetId} />
        </div>
    );
}
