export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-4 min-h-screen">
            {children}
        </div>
    )
}