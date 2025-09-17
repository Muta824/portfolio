export default function TodoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-4">
            {children}
        </div>
    );
} 