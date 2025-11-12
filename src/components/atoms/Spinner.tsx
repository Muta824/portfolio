export function Spinner({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex items-center justify-center py-8 mx-auto w-full">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg">{text}</p>
            </div>
        </div>
    )
}