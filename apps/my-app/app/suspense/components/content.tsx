// app/components/Content.tsx
export async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5초 대기
  return "Render completed";
}

export default async function Content() {
  const data = await getData();
  return (
    <main>
      <pre>{data}</pre>
    </main>
  );
}
