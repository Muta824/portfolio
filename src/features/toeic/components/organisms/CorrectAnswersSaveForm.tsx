'use client';

import React from 'react';
import { useState } from 'react';
import { useCorrectAnswers } from '../../hooks/useCorrectAnswers';
import { Question } from '../../types/data';

type CorrectAnswersSaveFormProps = {
    questions: Question[];
};

export const CorrectAnswersSaveForm: React.FC<CorrectAnswersSaveFormProps> = ({ questions }) => {
    const {
        answers,
        name,
        savedAnswers,
        setName,
        handleAnswerChange,
        handleSave,
        handleDelete,
        handleEdit,
    } = useCorrectAnswers();

    const [isFormVisible, setIsFormVisible] = useState(false); // フォームの表示状態を管理

    return (
        <div className="p-4 mt-6 border rounded shadow-md bg-white dark:bg-gray-900 dark:text-white max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">模範解答を作成</h2>

            {/* 名前入力 */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">保存名</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                    placeholder="模範解答の名前を入力"
                />
            </div>

            {/* フォームの表示・非表示を切り替えるボタン */}
            <button
                type="button"
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer mb-4"
            >
                {isFormVisible ? '模範解答を隠す' : '模範解答を表示'}
            </button>

            {isFormVisible && (
                <>
                    {/* 解答入力 */}
                    <div className="mb-5 mx-3 sm:mx-10">
                        <h3 className="text-xl font-semibold mb-2">模範解答</h3>
                        {questions.map((question) => (
                            <div key={question.id} className="mb-4">
                                <p className="font-medium text-xl">{question.text}</p>
                                <div className="flex flex-row justify-evenly space-x-2">
                                    {question.choices.map((choice) => (
                                        <button
                                            key={choice}
                                            className={`px-4 py-2 dark:bg-gray-900 dark:text-white rounded-xl border cursor-pointer size-15 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 ${
                                            answers[question.id] === choice
                                                ? 'bg-blue-500 text-white border-blue-600 shadow-lg hover:bg-blue-600 dark:bg-sky-600 dark:hover:bg-sky-700'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300'
                                            }`}
                                            onClick={() => handleAnswerChange(question.id, choice)}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 保存ボタン */}
                    <button
                        type="button"
                        onClick={() => {
                            handleSave();
                            setIsFormVisible(false);
                        }}
                        className="px-4 py-2 mb-6 mx-auto block bg-green-500 text-white rounded cursor-pointer"
                    >
                        保存
                    </button>
                </>
            )}

            {/* 保存済み模範解答のリスト */}
            <div className="">
                <h3 className="text-lg font-semibold mb-2">保存済みの模範解答</h3>
                <ul>
                    {Object.keys(savedAnswers).map((savedName) => (
                        <li key={savedName} className="flex items-center justify-between mb-2 dark:bg-gray-700 p-2 rounded-md">
                            <span>{savedName}</span>
                            <div className="flex flex-row space-x-2">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(savedName)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 cursor-pointer"
                                >
                                    編集
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(savedName)}
                                    className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
