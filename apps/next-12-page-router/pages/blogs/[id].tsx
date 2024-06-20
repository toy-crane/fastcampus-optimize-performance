import { GetServerSideProps } from "next";
import Link from "next/link";

interface BlogProps {
  blog: {
    id: number;
    title: string;
    body: string;
  } | null;
}

export default function Blog({ blog }: BlogProps) {
  if (!blog) {
    return <div>blog not found</div>;
  }

  return (
    <div>
      <h1>blog Item</h1>
      <p>
        <strong>ID:</strong> {blog.id}
      </p>
      <p>
        <strong>Title:</strong> {blog.title}
      </p>
      <p>
        <strong>content:</strong> {blog.body}
      </p>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      blog: res.status === 200 ? post : null,
    },
  };
};
