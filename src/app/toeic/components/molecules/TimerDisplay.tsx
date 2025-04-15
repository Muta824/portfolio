'use client';

import { useState, useEffect } from "react";

type TimerProps = {
  initialMinutes?: number; // 初期時間（分単位、任意）
  mode: "timer" | "stopwatch"; // タイマーのモード
};

export const TimerDisplay = ({ initialMinutes = 0, mode }: TimerProps) => {
  const [time, setTime] = useState(initialMinutes * 60); // 秒単位で管理
  const [isRunning, setIsRunning] = useState(false); // タイマーの開始/停止状態

  // タイマーの動作
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => (mode === "timer" ? prev - 1 : prev + 1));
    }, 1000);

    return () => clearInterval(timer); // クリーンアップ
  }, [isRunning, mode]);

  // タイマー終了時の処理（カウントダウンの場合）
  useEffect(() => {
    if (mode === "timer" && time <= 0) {
      setIsRunning(false); // タイマーを停止
    }
  }, [time, mode]);

  // 分と秒を計算
  const minutes = Math.floor(Math.abs(time) / 60);
  const seconds = Math.abs(time) % 60;

  return (
    <div className={`py-8 px-10 shadow-lg bg-white border-2 border-gray-200 rounded-xl
      ${isRunning ? "fixed top-0 right-0 left-0 flex justify-evenly items-center bg-white/95 backdrop-blur-sm" 
      : "text-center"} 
    `}>
      <h2 className={`text-4xl font-bold ${!isRunning ? "mb-8" : ""} text-gray-800`}>
        {mode === "timer" ? "TIMER" : "STOPWATCH"}
      </h2>

      <div className="p-8 border-2 border-gray-200 rounded-xl bg-gray-50 shadow-inner">
        <p className="text-5xl font-mono font-bold text-gray-800">
          {mode === "timer" && time < 0 ? "-" : ""}
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
      </div>

      {mode === "timer" && time <= 0 && (
          <p className="text-red-500 m-6 text-4xl font-bold">TIME IS UP !</p>
      )}

      <div className="flex justify-center items-center space-x-6">
        {isRunning && (
          <button
            className="px-8 py-4 mt-6 bg-gray-500 text-white rounded-xl border-2 border-gray-600 shadow-lg hover:bg-gray-600 transition-all duration-300 text-lg font-medium"
            onClick={() => setIsRunning(false)}
          >
            STOP
          </button>  
        )}
        {!isRunning && (
          <button
            className="px-8 py-4 mt-6 bg-green-500 text-white rounded-xl border-2 border-green-600 shadow-lg hover:bg-green-600 transition-all duration-300 text-lg font-medium"
            onClick={() => setIsRunning(true)}
          >
            START
          </button>
        )}

        {mode === "timer" && (
          <button
            className="px-8 py-4 mt-6 bg-red-500 text-white rounded-xl border-2 border-red-600 shadow-lg hover:bg-red-600 transition-all duration-300 text-lg font-medium"
            onClick={() => {setTime(initialMinutes * 60); setIsRunning(false);}}
          >
            RESET
          </button>
        )}
        {mode === "stopwatch" && (
          <button
            className="px-8 py-4 mt-6 bg-red-500 text-white rounded-xl border-2 border-red-600 shadow-lg hover:bg-red-600 transition-all duration-300 text-lg font-medium"
            onClick={() => {setTime(0); setIsRunning(false);}}
          >
            RESET
          </button>
        )}
      </div>
    </div>
  );
};