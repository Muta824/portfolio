export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sorry, couldn&apos;t find the content you were looking for</h1>
                <p className="text-gray-600 dark:text-gray-300">Find another movie or series</p>
            </div>
        </div>
    )
}