import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  // Load todos from the backend
  loadTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Failed to load TODOs. Please try again later.';
        this.loading = false;
        console.error('Error loading todos:', error);
      },
    });
  }

  // Add a new todo
  addTodo(): void {
    if (this.newTodo.trim()) {
      const todo: Todo = { id: 0, title: this.newTodo, isComplete: false };
      console.log('Adding TODO:', todo); // Debugging step

      this.loading = true;
      this.todoService.addTodo(todo).subscribe({
        next: (addedTodo) => {
          this.todos.push(addedTodo);
          this.newTodo = ''; // Clear input after adding
          this.loading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Failed to add TODO. Please try again later.';
          this.loading = false;
          console.error('Error adding todo:', error);
        },
      });
    }
  }

  // Delete a todo
  deleteTodo(id: number): void {
    this.loading = true;
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.loading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete TODO. Please try again later.';
        this.loading = false;
        console.error('Error deleting todo:', error);
      },
    });
  }

  // Toggle the completion status of a todo
  toggleTodoStatus(todo: Todo): void {
    this.loading = true;
    todo.isComplete = !todo.isComplete;
    this.todoService.updateTodoStatus(todo.id, todo.isComplete).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          'Failed to update TODO status. Please try again later.';
        this.loading = false;
        console.error('Error updating todo status:', error);
      },
    });
  }
}
