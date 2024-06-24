import Blog, { BlogType } from "./blog";

async function Page({ id }: { id: string }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const blog: BlogType = await res.json();

  return <Blog blog={blog} />;
}

export default Page;
