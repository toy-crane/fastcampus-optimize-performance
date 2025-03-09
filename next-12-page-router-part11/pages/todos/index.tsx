import { GetStaticProps } from "next";
import Link from "next/link";

interface Todo {
  id: number;
  title: string;
}

interface TodosProps {
  todos: Todo[];
}

const Todos = ({ todos }: TodosProps) => {
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">
        Back to Home
      </Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  const filteredTodos = todos.slice(0, 5);

  return {
    props: {
      todos: filteredTodos,
    },
  };
};

export default Todos;
