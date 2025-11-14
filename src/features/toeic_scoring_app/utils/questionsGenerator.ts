import { Question } from "../types/data";

// generate questions for test set
export function generateQuestions(testSetId: string): Question[] {
    const questions: Question[] = [];
    for (let i = 1; i <= 200; i++) {
        const part = generatePart(i);
        questions.push({
            id: testSetId,
            qId: i,
            choices: ["A", "B", "C", "D"],
            part: part,
        })
    }
    return questions;
}

// generate part by question id
function generatePart(qId: number): number {
    if (qId <= 6) return 1;
    else if (qId <= 31) return 2;
    else if (qId <= 70) return 3;
    else if (qId <= 100) return 4;
    else if (qId <= 130) return 5;
    else if (qId <= 146) return 6;
    else return 7;
}