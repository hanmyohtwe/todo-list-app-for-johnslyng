import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoItem } from './todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(todoText: string) {
    this.todoService.addTodo(todoText).subscribe(todo => {
      this.todos.push(todo);
    });
  }

  deleteTodo(todo: TodoItem) {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t !== todo);
    });
  }
}
