import Todos from "./todos";

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  const filteredTodos = todos.slice(0, 5);
  return filteredTodos;
}

async function Page() {
  const todos = await getTodos();
  return <Todos todos={todos} />;
}

export default Page;
