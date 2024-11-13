
# Angular & .NET TODO List App

A full-stack TODO list application built with an Angular frontend and a .NET Core Web API backend. This app allows users to add, update, and delete tasks, with data management handled through a RESTful API.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

---

## Project Structure
- `TodoApp/`: Angular frontend application
- `TodoApi/`: .NET Core Web API backend

---

## Features
- **CRUD Operations**: Add, update, delete, and view tasks.
- **Angular Frontend**: User-friendly UI built using Angular and Angular Bootstrap.
- **.NET Core API**: RESTful API backend built with .NET Core.

---

## Requirements
- **.NET Core SDK**
- **Node.js** (for Angular frontend)
- **Angular CLI** (optional, for frontend development)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/hanmyohtwe/todo-list-app-for-johnslyng.git
cd todo-list-app-for-johnslyng\code tests
```

### 2. Setup Backend (.NET Core API)
Navigate to the backend project directory:
```bash
cd TodoApi
```
Restore dependencies and run the project:
```bash
dotnet restore
dotnet run
```
The API should be available at `http://localhost:5000` (port may vary, please update the correct API_URL in todo.service.ts).

### 3. Setup Frontend (Angular App)
Navigate to the Angular project directory:
```bash
cd ../TodoApp
```
Install dependencies and start the Angular app:
```bash
npm install
ng serve
```
The frontend should be available at `http://localhost:4200`.

---

## Usage

1. Visit `http://localhost:4200` in your browser to view and use the TODO list application.
2. Add new tasks using the input field and button or type and press Enter.
3. Delete tasks by clicking the "Delete" button next to each item.
4. Click the checkbox for completed tasks.

---

## Technologies Used
- **Frontend**: Angular v18, Angular Bootstrap
- **Backend**: .NET Core v8 Web API
- **Database**: In-memory storage (for testing)

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
- Special thanks to [Angular](https://angular.io/) and [.NET](https://dotnet.microsoft.com/) teams for their documentation and resources.

