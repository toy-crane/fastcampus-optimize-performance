// app/dashboard/page.tsx
async function getData() {
  // sleep 5000ms
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return "render completed";
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <pre>{data}</pre>
    </main>
  );
}
