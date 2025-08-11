export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">記事を編集</h1>
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="space-y-6">
        {/* タイトルフィールドのスケルトン */}
        <div>
          <div className="w-16 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* 本文フィールドのスケルトン */}
        <div>
          <div className="w-16 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-40 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* カテゴリーフィールドのスケルトン */}
        <div>
          <div className="w-20 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* タグフィールドのスケルトン */}
        <div>
          <div className="w-24 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* ボタンのスケルトン */}
        <div className="flex justify-end gap-4">
          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  )
} 