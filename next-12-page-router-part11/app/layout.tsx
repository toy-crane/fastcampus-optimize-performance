import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My page title",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div style={{ maxWidth: "600px", margin: "auto" }}>{children}</div>
      </body>
    </html>
  );
}
