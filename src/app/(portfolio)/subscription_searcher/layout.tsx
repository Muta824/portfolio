export default function SubscriptionSearcherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="px-3 py-4 sm:p-4 h-screen overflow-auto" data-scroll-container>
            {children}
        </div>
    )
} 