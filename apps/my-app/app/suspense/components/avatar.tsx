// dashboard/components/avatar.tsx
export async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3초 대기
  return "Avatar render completed";
}

export default async function Avatar() {
  const data = await getData();
  return (
    <main>
      <pre>{data}</pre>
    </main>
  );
}
