import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
