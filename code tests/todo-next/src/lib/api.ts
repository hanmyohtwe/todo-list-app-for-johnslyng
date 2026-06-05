import { Todo } from "@/types/todo";

const LOCAL_STORAGE_KEY = "offline_todos";

export async function getTodos(): Promise<Todo[]> {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export async function addTodo(title: string): Promise<Todo> {
  const todos = await getTodos();
  const newTodo: Todo = {
    id: Date.now(),
    title,
    isComplete: false,
  };
  todos.push(newTodo);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  return newTodo;
}

export async function updateTodo(id: number, isComplete: boolean): Promise<void> {
  const todos = await getTodos();
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index].isComplete = isComplete;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }
}

export async function deleteTodo(id: number): Promise<void> {
  let todos = await getTodos();
  todos = todos.filter(t => t.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}
