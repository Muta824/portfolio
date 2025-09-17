export default function Loading() {
    return (
        <div className="flex items-center justify-center mt-5">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg">Loading...</p>
            </div>
        </div>
    )
}
