import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {TodoService, Todo} from '../todo.service';
import {FormsModule} from '@angular/forms';

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
  error: string = '';
  loading: boolean = false;

  private readonly fallbackTimeout = 5000; // 5 seconds

  constructor(
    private todoService: TodoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTodos();
    }
  }

  loadTodos(): void {
    this.loading = true;
    const fallbackTimer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Request is taking longer than expected. Please try again later.';
      }
    }, this.fallbackTimeout);

    this.todoService.getTodos().subscribe({
      next: (todos) => {
        clearTimeout(fallbackTimer);
        this.todos = todos;
        this.loading = false;
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (error) => {
        clearTimeout(fallbackTimer);
        this.errorMessage = error.message || 'Failed to load TODOs. Please try again later.';
        this.loading = false;
        console.error('Error loading todos:', error);
      },
    });
  }

  addTodo(): void {
    if (!this.newTodo.trim()) {
      this.error = 'Please enter a todo item before adding.';
      document.getElementById('todoInput')?.focus();
      return;
    }
    this.error = '';
    const todo: Todo = {id: 0, title: this.newTodo.trim(), isComplete: false};
    this.loading = true;

    const fallbackTimer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Adding TODO is taking longer than expected. Please try again later.';
      }
    }, this.fallbackTimeout);

    this.todoService.addTodo(todo).subscribe({
      next: (addedTodo) => {
        clearTimeout(fallbackTimer);
        this.todos.push(addedTodo);
        this.newTodo = '';
        this.loading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        clearTimeout(fallbackTimer);
        this.errorMessage = error.message || 'Failed to add TODO. Please try again later.';
        this.loading = false;
        console.error('Error adding todo:', error);
      },
    });
  }

  deleteTodo(id: number): void {
    this.loading = true;

    const fallbackTimer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Deleting TODO is taking longer than expected. Please try again later.';
      }
    }, this.fallbackTimeout);

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        clearTimeout(fallbackTimer);
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.loading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        clearTimeout(fallbackTimer);
        this.errorMessage = error.message || 'Failed to delete TODO. Please try again later.';
        this.loading = false;
        console.error('Error deleting todo:', error);
      },
    });
  }

  toggleTodoStatus(todo: Todo): void {
    const updatedStatus = !todo.isComplete;
    this.loading = true;

    const fallbackTimer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Updating TODO status is taking longer than expected. Please try again later.';
      }
    }, this.fallbackTimeout);

    this.todoService.updateTodoStatus(todo.id, updatedStatus).subscribe({
      next: () => {
        clearTimeout(fallbackTimer);
        todo.isComplete = updatedStatus; // Update local status
        this.loading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        clearTimeout(fallbackTimer);
        this.errorMessage = error.message || 'Failed to update TODO status. Please try again later.';
        this.loading = false;
        console.error('Error updating todo status:', error);
      },
    });
  }
}
