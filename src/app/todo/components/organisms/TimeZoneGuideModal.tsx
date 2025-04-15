'use client';

import Button from '../atoms/Button';

interface TimeZoneGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TimeZoneGuideModal({ isOpen, onClose }: TimeZoneGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full my-8">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            時間帯の分け方について
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                🧠 なぜ「タスクを3つ」にするのか？
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                脳のワーキングメモリには限界があり、一度にたくさんのことを抱えると注意力が分散し、生産性が落ちます。
                「3つ」に絞ることで、やりきる達成感が得られ、モチベーションにつながります。
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AM 1, 2, 3</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    朝の集中タイムにやるべきタスク。番号が小さいほど優先度と集中力が高くなります。
                    脳が最も冴えている時間帯に、最も重要なタスクを配置しましょう。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PM 1, 2, 3</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    午後のやや集中力が落ちてくる時間帯に合わせたタスク配置。
                    エネルギーに応じたタスク配分で、効率的に作業を進めましょう。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">その他 1, 2, 3</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    重要度・緊急度が低いタスクを配置するセクション。
                    やれたらやる、という柔軟な考え方で、余白を確保しながら進めましょう。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                💡 ヒント
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>朝の時間帯には、最も重要なタスクを配置しましょう</li>
                <li>午後は、やや集中力が落ちる時間帯に合わせたタスクを配置</li>
                <li>「その他」の時間帯は、柔軟に対応できるタスクを配置</li>
                <li>各時間帯は最大3つまでに制限されています</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={onClose}
            >
              閉じる
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 