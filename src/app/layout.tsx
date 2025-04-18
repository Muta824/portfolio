import "./globals.css";

export const metadata = {
  title: "My App Collection",
  description: "My App Collection",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
