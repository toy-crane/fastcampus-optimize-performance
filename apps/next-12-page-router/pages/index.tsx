import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">
        <a>Go to About Page</a>
      </Link>
      <h2>blogs</h2>
      <Link href="/blogs">
        <a>blog list</a>
      </Link>
    </div>
  );
}
