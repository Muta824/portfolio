import { auth } from "@/auth"

export default async function TestSessionPage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          セッション情報テスト
        </h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            現在のセッション
          </h2>
          
          {session ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ユーザーID
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session.user?.id || "未設定"}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    名前
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session.user?.name || "未設定"}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    メールアドレス
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session.user?.email || "未設定"}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ロール
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {session.user?.role || "未設定"}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✅ セッションが正常に作成されています
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200">
                ❌ セッションが作成されていません。ログインしてください。
              </p>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              デバッグ情報
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 