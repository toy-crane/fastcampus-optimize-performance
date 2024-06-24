"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type BlogType = {
  id: number;
  title: string;
  body: string;
};

interface BlogProps {
  blog: BlogType | null;
}

export default function Blog({ blog }: BlogProps) {
  const router = useRouter();
  const pathName = usePathname();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>Blog Item</h1>
      <p>
        <strong>ID:</strong> {blog.id}
      </p>
      <p>
        <strong>Title:</strong> {blog.title}
      </p>
      <p>
        <strong>Content:</strong> {blog.body}
      </p>
      <p>
        <strong>Current Path:</strong> {pathName}
      </p>
      <Link href="/">Back to Home</Link>
      <button onClick={() => router.push("/blogs")}>Go to Blogs List</button>
    </div>
  );
}
