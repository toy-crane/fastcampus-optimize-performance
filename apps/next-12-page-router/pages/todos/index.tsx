import { GetStaticProps } from "next";
import Link from "next/link";

interface Todo {
  id: number;
  title: string;
}

interface TodosProps {
  todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>
              <a>{todo.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">
        <a>Back to Home</a>
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
