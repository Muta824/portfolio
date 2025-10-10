import "./globals.css";

export const metadata = {
    title: "Yuta Nakamura | Portfolio",
    description: "Yuta Nakamura | Portfolio",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className="dark:bg-gray-900 dark:text-white">
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
