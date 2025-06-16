'use client'

import { useState, useEffect } from "react";
import { useScoreContext } from "../../contexts/ScoreContext";

type SavedResult = {
    name: string;
    answers: Record<number, string>;
    results: Record<number, boolean>;
    score: number;
    savedAt: string;
};

export const SavedResults = () => {
    const [savedList, setSavedList] = useState<Record<string, SavedResult>>({});
    const [searchName, setSearchName] = useState("");
    const [selectedResult, setSelectedResult] = useState<SavedResult | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const { score } = useScoreContext();

    {/*savedListにlocalStorageに保存されているデータを保存 */}
    useEffect(() => {
        const stored = localStorage.getItem("savedScores");
        if (stored) {
            setSavedList(JSON.parse(stored));
        }
    }, [score]); //依存関係をscoreにすることで、ResultSaveFormでscoreを変更するとSavedResultsで再レンダリングが起こる

    {/* 選択 */}
    const handleSelect = (name: string) => {
        setSelectedResult(savedList[name]);
    };

    {/* 削除 */}
    const handleDelete = (name: string) => {
        const confirmed = window.confirm(`「${name}」の保存結果を削除しますか？`);
        if (!confirmed) return;

        const newList = { ...savedList };
        delete newList[name];
        localStorage.setItem("savedScores", JSON.stringify(newList));
        setSavedList(newList);

        if (selectedResult?.name === name) {
            setSelectedResult(null);
        }
    };

    const filteredNames = Object.keys(savedList).filter((name) =>
        name.toLowerCase().includes(searchName.toLowerCase())
    );    

    const answerEntries = Object.entries(selectedResult?.answers || {});

    return (
    <div className="mt-6 border py-3 px-5 rounded dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-2">保存済みの採点結果</h2>
        <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="名前で検索"
            className="border px-3 py-2 rounded mb-4 w-full max-w-sm dark:bg-gray-900 dark:text-white dark:border-white"
        />
        
        {/*保存したテストのリスト*/}
        <ul className="space-y-2 dark:bg-gray-900 dark:text-white">
        {filteredNames.map((name) => (
          <li key={name} className="flex items-center justify-between bg-white p-2 rounded shadow-sm dark:bg-gray-700 dark:text-white">
            <button
              className="text-blue-500 hover:text-blue-900 cursor-pointer dark:text-white dark:hover:text-blue-200"
              onClick={() => handleSelect(name)} //保存した名前を代入し、詳細を表示
            >
              {name}
            </button>
            <button
              onClick={() => handleDelete(name)}
              className="text-red-500 hover:text-red-900 text-sm cursor-pointer dark:text-white dark:hover:text-red-900"
            >
              🗑 削除
            </button>
          </li>
        ))}
        {filteredNames.length === 0 && <p>一致する保存結果がありません。</p>}
        </ul>

        {/*選択した問題の詳細を表示*/}
        {selectedResult && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50 dark:bg-gray-900">
            <h3 className="text-lg font-bold mb-2">📋 {selectedResult.name}</h3>
            <p>正解数: {selectedResult.score}</p>
            <p>保存日時: {new Date(selectedResult.savedAt).toLocaleString()}</p>
            {/* 詳細表示用のボタン */}
            <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded cursor-pointer dark:bg-blue-500 dark:text-white"
            >
                {showDetails ? "詳細を隠す" : "詳細を見る"}
            </button>

            {/* 詳細表示エリア */}
            {showDetails && (
            <div className="mt-4 max-h-[300px] overflow-y-auto text-base dark:bg-gray-900">
                <h4 className="font-semibold mb-2">📝 問題ごとの結果:</h4>
                <ul className="space-y-1 dark:bg-gray-900">
                {answerEntries.map(([id, choice]) => {
                    const qId = Number(id) + 1;
                    const correct = selectedResult.results[qId];
                    const choiceText = typeof choice === 'object' && choice !== null && 'selectedChoice' in choice 
                        ? (choice as { selectedChoice: string }).selectedChoice 
                        : choice;
                    return (
                        <li key={qId}>
                            Q{qId}：「{choiceText}」 →
                            <span className={correct ? "text-green-600 dark:text-green-600" : "text-red-600 dark:text-red-600"}>
                                {correct ? " 正解" : " 不正解"}
                            </span>
                        </li>
                    );
                })}
                </ul>
            </div>            
            )}
        </div>
        )}
    </div>
    );
};
