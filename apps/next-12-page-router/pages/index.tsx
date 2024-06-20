import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">
        <a>Go to About Page</a>
      </Link>
      <h2>blogs</h2>
      <ul>
        <li>
          <Link href="/blogs">
            <a>blog list</a>
          </Link>
        </li>
        <li>
          <Link href="/todos">
            <a>Go to Todos List</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
