export function TodosSkeleton() {
    return (
        <div className="mt-8 p-4 border rounded-lg animate-pulse">
            {/* タイトルのスケルトン */}
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            
            {/* ナビゲーションのスケルトン */}
            <div className="flex items-center justify-between mt-4 mb-6">
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-6 bg-gray-300 rounded w-32"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>

            {/* フォームのスケルトン */}
            <div className="mb-4 flex gap-2">
                <div className="flex-1 h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded w-20"></div>
            </div>

            {/* Todosリストのスケルトン */}
            <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border rounded">
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                        <div className="flex-1 h-5 bg-gray-300 rounded"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

