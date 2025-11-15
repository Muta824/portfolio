export interface TestSet {
	id: string; // related to question (uuid)
	name: string; // user can define the name of each test set (e.g. "公式TOEIC Listening & Reading 問題集11")
	createdAt: Date;
	updatedAt: Date;
	
	questions: Question[]; // set has Questions 200 problems separated by part
	answers: AnswerSet; // answers of this test (模範解答)
}

export interface Question {
	id: string; // related to test set
	qId: number; // No. of question
	choices: string[]; // A ~ D
	// 1 ~ 7
	// part1 (1 ~ 6)
	// part2 (7 ~ 31)
	// part3 (32 ~ 70)
	// part4 (71 ~ 100)
	// part5 (101 ~ 130)
	// part6 (131 ~ 146)
	// part7 (147 ~ 200)
	part: number; 
}

export interface AnswerSet {
	id: string; // related to TestSet
	name: string; // user can define the name of each test session
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	answers: Record<number, string>; // 200 answers (模範解答)
}

// ユーザーの回答用紙
export interface UserAnswerSheet {
	id: string; // Answer sheet ID
	testSetId: string; // Related TestSet ID
	name: string; // User-defined answer sheet name (e.g., "1st attempt", "2nd attempt")
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	answers: Record<number, string>; // User's answers
}

export interface Result {
	id: string; // related to TestSet
	name: string; // related to AnswerSet
	userId: string;
	
	score: number;
	percentage: number;
	correctCount: number;
	
	userAnswers?: AnswerSet; // should I let Result have AnswerSet?
}