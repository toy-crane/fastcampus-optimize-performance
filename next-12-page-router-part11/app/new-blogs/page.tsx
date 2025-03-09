import Blogs, { Blog } from "./blogs";

async function getBlogs() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  const blogs: Blog[] = await res.json();
  return blogs;
}

async function Page() {
  const blogs = await getBlogs();
  return <Blogs blogs={blogs} />;
}

export default Page;
