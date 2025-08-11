'use client';

import Button from '@/components/atoms/Button';

interface UsageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsageGuideModal({ isOpen, onClose }: UsageGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full my-8 max-h-screen overflow-y-auto">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            使い方ガイド
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                📝 基本的な使い方
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                このToDoリストは、時間帯ごとにタスクを管理できるように設計されています。
                各時間帯に最大3つまでのタスクを設定でき、優先順位に応じて配置できます。
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">タスクの追加</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    各時間帯のセルをクリックしてタスクを入力できます。
                    Enterキーを押すか、セルの外をクリックすると保存されます。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">タスクの完了</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    タスクの右側にあるボタンをクリックすると、タスクを完了状態にできます。
                    完了したタスクは編集できなくなります。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">日付の変更</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    左側のカレンダーから日付を選択することで、異なる日のタスクを管理できます。
                    タスクは日付ごとに自動的に保存されます。
                  </p>
                </div>
              </div>
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