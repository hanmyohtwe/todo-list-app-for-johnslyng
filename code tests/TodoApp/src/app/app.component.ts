import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TodoListComponent
  ],
})
export class AppComponent {
  title = 'todo-list-app';
}
