export interface TestSet {
	id: number; // related to question
	createdAt: Date;
	updatedAt: Date;
	
	questions: Question[]; // set has Questions 200 problems separated by part
	answers: AnswerSet; // answers of this test	
}

export interface Question {
	id: number; // related to test set
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
	id: number; // related to TestSet
	name: string; // user can define the name of each test session
	userId: number;
	createdAt: Date;
	updatedAt: Date;
	answers: Qustion[]; // 200 answers of (A ~ D)
}

export interface Result {
	id: number; // related to TestSet
	name: string; // related to AnswerSet
	userId: number;
	
	score: number;
	percentage: number;
	correctCount: number;
	
	userAnswers?: AnswerSet; // should I let Result have AnswerSet?
}