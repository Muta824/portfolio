'use client'

import { useSave } from "../../hooks/useSave";
import { useScoreContext } from "../../contexts/ScoreContext";

export const ResultSaveForm = () => {
  const { name, setName, handleSave } = useSave();
  const { score, setScore } = useScoreContext();

  return (
    <div className="mt-6 border py-3 px-5 rounded">
        <label className="block mb-2 font-semibold mx-1">名前を入力して採点結果を保存</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm mb-3 mx-1"
          placeholder="ex: 第１回模試"
        />
        <button
          onClick={() => {handleSave(); setScore(null)}} //scoreをnullにすることでResultコンポーネントを再レンダリングする
          className={`px-4 py-2 rounded bg-blue-500 text-white mx-1 
            ${score !== null ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={score === null}
        >
          結果を保存する
        </button>
    </div>
  );
};
