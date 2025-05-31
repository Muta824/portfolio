import { useState } from "react";
import { TimerDisplay } from "../molecules/TimerDisplay";

export const Timer = () => {
    const [initialMinutes, setInitialMinutes] = useState(120); // 初期時間（デフォルト120分）
    const [mode, setMode] = useState<"timer" | "stopwatch">("timer"); // タイマーモード
    return (
        <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4 mt-5">
            <div className="w-full max-w-md border border-gray-200 dark:border-white bg-white dark:bg-gray-800 p-6 mb-10 rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Timer Setting</h2>
                <div className="mb-4">
                    <label className="block text-m font-medium mb-2 text-gray-800 dark:text-white">Time Limit (min)</label>
                    <input
                        type="number"
                        value={initialMinutes}
                        onChange={(e) => setInitialMinutes(Number(e.target.value))}
                        className="w-full p-2 border rounded-md text-gray-800 dark:text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-m font-medium mb-2 text-gray-800 dark:text-white">Mode</label>
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as "timer" | "stopwatch")}
                        className="w-full p-2 border rounded-md text-gray-800 dark:text-white dark:bg-gray-900"
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
