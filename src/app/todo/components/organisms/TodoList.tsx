'use client';

import { Task, ConcentrationLevel } from '../../types/todo';
import Button from '../atoms/Button';

interface TodoListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
}

const concentrationLevels = [
  { id: 'am1' as ConcentrationLevel, label: 'AM 1' },
  { id: 'am2' as ConcentrationLevel, label: 'AM 2' },
  { id: 'am3' as ConcentrationLevel, label: 'AM 3' },
  { id: 'pm1' as ConcentrationLevel, label: 'PM 1' },
  { id: 'pm2' as ConcentrationLevel, label: 'PM 2' },
  { id: 'pm3' as ConcentrationLevel, label: 'PM 3' },
  { id: 'other1' as ConcentrationLevel, label: 'その他 1' },
  { id: 'other2' as ConcentrationLevel, label: 'その他 2' },
  { id: 'other3' as ConcentrationLevel, label: 'その他 3' },
];

export default function TodoList({ tasks, onUpdateTask }: TodoListProps) {
  const handleToggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      onUpdateTask({
        ...task,
        isCompleted: !task.isCompleted,
        updatedAt: new Date(),
      });
    }
  };

  const handleCellChange = (concentrationLevel: ConcentrationLevel, field: 'content', value: string) => {
    const task = tasks.find(t => t.concentrationLevel === concentrationLevel);
    
    if (task) {
      onUpdateTask({
        ...task,
        [field]: value,
        updatedAt: new Date(),
      });
    } else if (value.trim() !== '') {
      const newTask: Task = {
        id: Date.now().toString(),
        content: value,
        concentrationLevel,
        dueDate: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onUpdateTask(newTask);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, concentrationLevel: ConcentrationLevel, value: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCellChange(concentrationLevel, 'content', value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
          TODOリスト
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tasks.filter(t => t.isCompleted).length} / {tasks.filter(t => t.content.trim() !== '').length} 完了
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100 dark:border-gray-700">
              <th className="px-2 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-100 dark:border-gray-700">時間帯</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">タスク</th>
            </tr>
          </thead>
          <tbody>
            {concentrationLevels.map((level) => {
              const task = tasks.find(t => t.concentrationLevel === level.id);
              return (
                <tr key={level.id} className={`border-b border-gray-100 dark:border-gray-700 transition-colors duration-200 ${
                  task?.isCompleted ? 'bg-gray-50 dark:bg-gray-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                }`}>
                  <td className="px-1 sm:px-4 py-2 text-sm text-gray-900 dark:text-white border-r border-gray-100 dark:border-gray-700 font-medium">
                    {level.label}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        {task?.isCompleted && (
                          <svg
                            className="w-5 h-5 text-green-500 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <input
                          type="text"
                          value={task?.content || ''}
                          onChange={(e) => handleCellChange(level.id, 'content', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, level.id, e.currentTarget.value)}
                          disabled={task?.isCompleted}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            task?.isCompleted
                              ? 'text-gray-400 dark:text-gray-500 line-through cursor-not-allowed'
                              : 'text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
                          }`}
                          placeholder="タスクを入力"
                        />
                      </div>
                      {task && task.content.trim() !== '' && (
                        <Button
                          variant={task.isCompleted ? 'primary' : 'secondary'}
                          size="sm"
                          onClick={() => handleToggleComplete(task.id)}
                          className="ml-3"
                        >
                          {task.isCompleted ? '完了' : '未完了'}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
