"use client";
import Link from "next/link";

export interface Blog {
  id: number;
  title: string;
}

interface BlogsProps {
  blogs: Blog[];
}

export default function Blogs({ blogs }: BlogsProps) {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
