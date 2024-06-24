import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"max-w-[600px] mx-auto"}>{children}</body>
    </html>
  );
}
