import { MetadataRoute } from "next";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();

  return todos.map((todo) => ({
    url: `https://yourdomain.com/todos/${todo.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: todo.completed ? 0.5 : 0.8,
  }));
}
