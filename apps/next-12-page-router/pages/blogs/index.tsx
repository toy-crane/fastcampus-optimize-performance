import { GetServerSideProps } from "next";
import Link from "next/link";

interface Blog {
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
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">
        Back to Home
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
};
