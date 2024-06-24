import { Metadata } from "next";

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

// 메타 데이터를 동적으로 가져오는 함수
export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const post = await response.json();

  return {
    title: post.title,
    description: `${post.title} - ${post.completed}`,
  };
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
