import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface TodoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  } | null;
}

export default function Todo({ todo }: TodoProps) {
  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h1>Todo Item</h1>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
      </p>
      <Link href="/">
        Back to Home
      </Link>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  const paths = todos.slice(0, 5).map((todo: { id: number }) => ({
    params: { id: todo.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const todo = await res.json();

  return {
    props: {
      todo: res.status === 200 ? todo : null,
    },
  };
};
