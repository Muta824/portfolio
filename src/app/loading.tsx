export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* シンプルなスピナー */}
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        
        {/* シンプルなテキスト */}
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  )
}
