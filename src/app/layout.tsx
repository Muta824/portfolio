import "./globals.css";

export const metadata = {
  title: "My App Collection",
  description: "My App Collection",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body>
                <main className="dark:bg-gray-900">
                    {children}
                </main>
            </body>
        </html>
    )
}
