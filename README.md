# Task Manager Application

A full-stack task manager built with .NET 8 Web API and React TypeScript.

## Features

- ✅ Display list of tasks
- ✅ Add new tasks
- ✅ Mark tasks as completed/uncompleted
- ✅ Delete tasks
- ✅ Filter tasks (All/Active/Completed)
- ✅ Local storage backup
- ✅ Modern UI with shadcn/ui and Tailwind CSS

## Tech Stack

### Backend (.NET 8)
- ASP.NET Core Web API
- In-memory data storage
- CORS enabled for React app
- Swagger/OpenAPI documentation

### Frontend (React + TypeScript)
- React 18 with TypeScript
- Vite for build tooling
- shadcn/ui components
- Tailwind CSS for styling
- Axios for API calls
- Local storage for offline support

## Setup Instructions

### Prerequisites
- .NET 8 SDK
- Node.js (v18 or higher)
- npm

### Quick Setup
```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Manual Setup

#### Backend
```bash
cd Backend
dotnet restore
dotnet run
```
Backend runs on: http://localhost:5000

#### Frontend
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Project Structure

```
TaskManager/
├── Backend/
│   ├── Controllers/TasksController.cs
│   ├── Models/TaskItem.cs
│   ├── Services/TaskService.cs
│   └── Program.cs
├── Frontend/
│   ├── src/
│   │   ├── components/ui/
│   │   ├── services/taskService.ts
│   │   ├── types/task.ts
│   │   ├── utils/localStorage.ts
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Usage

1. Start both backend and frontend servers
2. Open http://localhost:3000 in your browser
3. Add tasks using the input field
4. Click checkboxes to mark tasks as complete
5. Use filter buttons to view different task states
6. Delete tasks using the trash icon
7. Tasks are automatically saved to localStorage as backup
