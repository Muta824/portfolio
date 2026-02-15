export function ContentCardSkeleton() {
    return (
        <div className="w-full">
            <div className="w-full aspect-[2/3] rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mt-2 animate-pulse" />
            <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-600 rounded mt-2 animate-pulse mx-auto" />
        </div>
    );
}
