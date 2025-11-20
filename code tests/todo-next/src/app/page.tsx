"use client";

import useSWR from "swr";
import { getTodos, addTodo, updateTodo, deleteTodo } from "@/lib/api";
import TodoItem from "@/components/TodoItem";
import AddTodo from "@/components/AddTodo";

export default function Home() {
  const {
    data: todos = [],
    error,
    mutate,
    isLoading,
  } = useSWR("todos", getTodos, {
    refreshInterval: 1000, // Poll every 1 second
  });

  async function handleAdd(title: string) {
    try {
      await addTodo(title);
      mutate(); // Revalidate list
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  }

  async function handleToggle(id: number, isComplete: boolean) {
    try {
      // Optimistic update could be done here, but simple revalidation is fast enough for now
      await updateTodo(id, isComplete);
      mutate();
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTodo(id);
      mutate();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Todo App (Next.js)
        </h1>

        <AddTodo onAdd={handleAdd} />

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            Failed to load todos. Is the backend running?
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
            {todos.length === 0 && !error && (
              <div className="text-center text-gray-500 mt-8">
                No todos yet. Add one above!
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
