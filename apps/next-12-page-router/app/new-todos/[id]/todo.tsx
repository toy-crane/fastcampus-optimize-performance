import Link from "next/link";

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  todo: TodoType | null;
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
      <Link href="/">Back to Home</Link>
    </div>
  );
}
