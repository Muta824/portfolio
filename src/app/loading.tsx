export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {/* メインローディングアニメーション */}
        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto">
            {/* 外側の円 */}
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            {/* 回転する円 */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            {/* 内側の点 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* ローディングテキスト */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 animate-pulse">
            Loading...
          </h2>
          <p className="text-gray-600 text-sm">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* ドットアニメーション */}
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* プログレスバー */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* 装飾的な要素 */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-200 rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-purple-200 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 border-2 border-blue-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 right-5 w-6 h-6 border-2 border-purple-300 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  )
}
