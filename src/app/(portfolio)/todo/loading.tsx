function TodoCardSkeleton({ title }: { title: string }) {
    return (
        <div className="p-4 border rounded-lg animate-pulse">
            <h2 className="text-2xl text-center font-bold mb-4">{title}</h2>
            
            {/* ナビゲーションのスケルトン */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* フォームのスケルトン */}
            <div className="mb-4 flex gap-2">
                <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>

            {/* Todosリストのスケルトン */}
            <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border rounded">
                        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="flex-1 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <>
            {/* ヘッダー */}
            <div className="flex justify-between items-center animate-pulse">
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            {/* タイトル */}
            <h1 className="text-4xl mb-8 font-bold">Todo List</h1>

            <div className="flex flex-col lg:flex-row-reverse justify-center gap-4">
                {/* DailyTodos スケルトン */}
                <div className="w-full lg:w-2/3 animate-pulse">
                    <div className="flex flex-col sm:flex-row gap-4 mb-5">
                        <div className="h-10 w-36 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-10 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>

                    {/* SelectedTodos スケルトン */}
                    <div className="space-y-2 mb-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 border rounded">
                                <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="flex-1 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            </div>
                        ))}
                    </div>

                    {/* UndoneTodos スケルトン */}
                    <div className="mt-8 border rounded-lg p-4">
                        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                        <div className="space-y-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border rounded">
                                    <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    <div className="flex-1 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* サイドバー Weekly/Monthly/Yearly スケルトン */}
                <div className="w-full lg:w-1/3 space-y-8 mb-6">
                    <TodoCardSkeleton title="Weekly Todos" />
                    <TodoCardSkeleton title="Monthly Todos" />
                    <TodoCardSkeleton title="Yearly Todos" />
                </div>
            </div>
        </>
    );
}
