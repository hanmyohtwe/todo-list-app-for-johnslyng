import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

const API_URL = 'http://localhost:5208/api/todo';
const REQUEST_TIMEOUT = 10000; // 10 seconds timeout for requests

export interface Todo {
  id: number;
  title: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  // Get all todos with error handling
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL).pipe(
      timeout(REQUEST_TIMEOUT),
      catchError((error) => {
        console.error('Error fetching todos:', error);
        return throwError(
          () =>
            new Error('Unable to fetch TODOs. The server might be unavailable.')
        );
      })
    );
  }

  // Add a new todo with error handling
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(API_URL, todo).pipe(
      timeout(REQUEST_TIMEOUT),
      catchError((error) => {
        console.error('Error adding todo:', error);
        return throwError(
          () =>
            new Error('Unable to add TODO. The server might be unavailable.')
        );
      })
    );
  }

  // Delete a todo by ID with error handling
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      timeout(REQUEST_TIMEOUT),
      catchError((error) => {
        console.error('Error deleting todo:', error);
        return throwError(
          () =>
            new Error('Unable to delete TODO. The server might be unavailable.')
        );
      })
    );
  }

  // Update the completion status of a todo with error handling
  updateTodoStatus(id: number, isComplete: boolean): Observable<void> {
    return this.http.put<void>(`${API_URL}/${id}`, isComplete).pipe(
      timeout(REQUEST_TIMEOUT),
      catchError((error) => {
        console.error('Error updating todo status:', error);
        return throwError(
          () =>
            new Error(
              'Unable to update TODO status. The server might be unavailable.'
            )
        );
      })
    );
  }
}
