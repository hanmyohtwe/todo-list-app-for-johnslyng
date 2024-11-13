import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5000/api/todo'; // Update the port based on your environment setup

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

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL).pipe(
      catchError(this.handleError('fetch TODOs'))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(API_URL, todo).pipe(
      catchError(this.handleError('add TODO'))
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      catchError(this.handleError('delete TODO'))
    );
  }

  updateTodoStatus(id: number, isComplete: boolean): Observable<void> {
    return this.http.put<void>(`${API_URL}/${id}`, isComplete).pipe(
      catchError(this.handleError('update TODO status'))
    );
  }

  // Centralized error handling
  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage: string;

      if (error.status === 0) {
        // Network error or server is unreachable
        errorMessage = `Unable to connect to the server to ${operation}. Please check your network connection or try again later.`;
      } else if (error.status >= 500) {
        // Server-side error
        errorMessage = `The server encountered an error while trying to ${operation}. Please try again later.`;
      } else {
        // Client-side error or other cases
        errorMessage = `An error occurred while trying to ${operation}: ${error.message}`;
      }

      console.error(`${operation} failed:`, error); // Log error to console
      return throwError(() => new Error(errorMessage));
    };
  }
}
