import { UserAnswerSheet } from '../types/data';

/**
 * ユーザー回答用紙一覧を取得（localStorageから）
 */
export function getUserAnswerSheets(testSetId: string): UserAnswerSheet[] {
    const stored = localStorage.getItem(`toeic_scoring_user_answer_sheets_${testSetId}`);
    if (!stored) return [];
    return JSON.parse(stored);
}

/**
 * ユーザー回答用紙を保存
 */
export function saveUserAnswerSheet(testSetId: string, answerSheet: UserAnswerSheet): void {
    const answerSheets = getUserAnswerSheets(testSetId);
    const existingIndex = answerSheets.findIndex(a => a.id === answerSheet.id);
    
    if (existingIndex >= 0) {
        answerSheets[existingIndex] = answerSheet;
    } else {
        answerSheets.push(answerSheet);
    }
    
    localStorage.setItem(`toeic_scoring_user_answer_sheets_${testSetId}`, JSON.stringify(answerSheets));
}

/**
 * 新しいユーザー回答用紙を作成
 */
export function createUserAnswerSheet(testSetId: string, name: string): UserAnswerSheet {
    const answerSheet: UserAnswerSheet = {
        id: `${testSetId}_${Date.now()}`,
        testSetId,
        name,
        userId: 'current-user', // TODO: 実際のユーザーIDに置き換え
        createdAt: new Date(),
        updatedAt: new Date(),
        answers: {}
    };
    
    saveUserAnswerSheet(testSetId, answerSheet);
    return answerSheet;
}

/**
 * ユーザー回答用紙を削除
 */
export function deleteUserAnswerSheet(testSetId: string, answerSheetId: string): void {
    const answerSheets = getUserAnswerSheets(testSetId);
    const filtered = answerSheets.filter(a => a.id !== answerSheetId);
    localStorage.setItem(`toeic_scoring_user_answer_sheets_${testSetId}`, JSON.stringify(filtered));
    
    // 関連する結果も削除
    localStorage.removeItem(`toeic_scoring_result_${testSetId}_${answerSheetId}`);
}

/**
 * ユーザー回答用紙を取得（IDで）
 */
export function getUserAnswerSheet(testSetId: string, answerSheetId: string): UserAnswerSheet | null {
    const answerSheets = getUserAnswerSheets(testSetId);
    return answerSheets.find(a => a.id === answerSheetId) || null;
}