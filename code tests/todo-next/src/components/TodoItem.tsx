"use client";

import { Todo } from "@/types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number, isComplete: boolean) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm mb-2">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={(e) => onToggle(todo.id, e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                    className={`text-lg ${todo.isComplete ? "text-gray-400 line-through" : "text-gray-700"
                        }`}
                >
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
                Delete
            </button>
        </div>
    );
}
