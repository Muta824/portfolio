import { useState } from "react";
import { useAnswer } from "../contexts/AnswerContext";
import { useResultsContext } from "../contexts/ResultContext";
import { useScoreContext } from "../contexts/ScoreContext";

export const useSave = () => {
    const { answers } = useAnswer();
    const { results } = useResultsContext();
    const { score } = useScoreContext();
    const [name, setName] = useState("");

    const handleSave = () => {
        if (!name) {
            alert("名前を入力してください");
            return;
        }

        const existing = JSON.parse(localStorage.getItem("savedScores") || "{}");

        const newEntry = {
            name,
            answers,
            results,
            score,
            savedAt: new Date().toISOString(),
        };

        localStorage.setItem("savedScores", JSON.stringify({
            ...existing,
            [name]: newEntry
        }));

        alert("保存しました！");
        setName(""); 
    }
    return { name, setName, handleSave };
}
