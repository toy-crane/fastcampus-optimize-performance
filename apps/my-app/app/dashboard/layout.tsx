export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>대시보드 네비게이터</nav>
      {children}
    </section>
  );
}
