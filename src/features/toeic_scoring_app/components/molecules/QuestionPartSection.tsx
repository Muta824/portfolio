import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import { Question } from '../../types/data';
import { QuestionButton } from './QuestionButton';

interface QuestionPartSectionProps {
    part: number;
    questions: Question[];
    answers: Record<number, string>;
    onQuestionClick: (questionId: number) => void;
}

export function QuestionPartSection({ 
    part, 
    questions, 
    answers, 
    onQuestionClick 
}: QuestionPartSectionProps) {
    return (
        <Card className="space-y-4">
            <Text variant="h3">Part {part}</Text>
            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 gap-2">
                {questions.map(question => (
                    <QuestionButton
                        key={question.qId}
                        questionId={question.qId}
                        selectedAnswer={answers[question.qId]}
                        onClick={() => onQuestionClick(question.qId)}
                    />
                ))}
            </div>
        </Card>
    );
}

