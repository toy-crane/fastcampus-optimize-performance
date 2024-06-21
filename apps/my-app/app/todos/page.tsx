// app/todos/page.tsx
async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      {/* 데이터를 사용하여 UI를 렌더링 */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
