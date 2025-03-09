import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">
        Go to About Page
      </Link>
      <h2>blogs</h2>
      <ul>
        <li>
          <Link href="/blogs">
            blog list
          </Link>
        </li>
        <li>
          <Link href="/todos">
            Go to Todos List
          </Link>
        </li>
      </ul>
    </div>
  );
}
