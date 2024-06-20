import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface BlogProps {
  blog: {
    id: number;
    title: string;
    body: string;
  } | null;
}

export default function Blog({ blog }: BlogProps) {
  const router = useRouter();

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
        <strong>Current Path:</strong> {router.asPath}
      </p>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <button onClick={() => router.push("/blogs")}>Go to Blogs List</button>
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
