import { useState } from "react";
import { TimerDisplay } from "../molecules/TimerDisplay";

export const Timer = () => {
    const [initialMinutes, setInitialMinutes] = useState(120); // 初期時間（デフォルト120分）
    const [mode, setMode] = useState<"timer" | "stopwatch">("timer"); // タイマーモード
    return (
        <div className="">
            <div className="w-full max-w-md border bg-white p-6 shadow-md mb-10 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Timer Setting</h2>
                <div className="mb-4">
                    <label className="block text-m font-medium mb-2">Time Limit (min)</label>
                    <input
                        type="number"
                        value={initialMinutes}
                        onChange={(e) => setInitialMinutes(Number(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-m font-medium mb-2">Mode</label>
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as "timer" | "stopwatch")}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="timer">Timer</option>
                        <option value="stopwatch">Stopwatch</option>
                    </select>
                </div>
            </div>
            <TimerDisplay initialMinutes={initialMinutes} mode={mode} />
        </div>
    )
}
