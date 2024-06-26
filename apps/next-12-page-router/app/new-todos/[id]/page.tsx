import Todo, { TodoType } from "./todo";

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: TodoType[] = await res.json();
  const paths = todos.slice(0, 5).map((todo: { id: number }) => ({
    id: todo.id.toString(),
  }));
  return paths;
}

async function getTodo(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const todo: TodoType = await res.json();
  return todo;
}

async function Page({ params }: { params: { id: string } }) {
  const todo = await getTodo(params.id);
  return <Todo todo={todo} />;
}

export default Page;
