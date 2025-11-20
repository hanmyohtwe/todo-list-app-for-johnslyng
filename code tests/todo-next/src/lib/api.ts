import { Todo } from "@/types/todo";

const API_URL = "http://localhost:5000/api/todo";

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function addTodo(title: string): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, isComplete: false }),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

export async function updateTodo(id: number, isComplete: boolean): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(isComplete),
  });
  if (!res.ok) throw new Error("Failed to update todo");
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}
