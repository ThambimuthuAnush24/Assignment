# 📝 Todo Application

A beautiful, modern Todo application with React (Vite) frontend and Spring Boot backend using MySQL database.

## ✨ Features

### 🎯 Core Functionality
- ✅ **Create Tasks** - Add new tasks with title and description
- ✅ **Edit Tasks** - Inline editing with save/cancel options
- ✅ **Complete Tasks** - Mark tasks as done to remove them from the list
- ✅ **Auto-Numbering** - Tasks are automatically numbered 1-5 in order
- ✅ **Smart Ordering** - First task added appears first, maintains chronological order
- ✅ **Auto-Reordering** - Numbers automatically update when tasks are completed

### 🎨 Enhanced UI/UX
- 🌈 **Modern Design** - Clean, gradient-based interface with Tailwind CSS
- ✨ **Smooth Animations** - Slide-in, fade-in, and hover effects
- 💫 **Interactive Elements** - Hover effects, scale transforms, and transitions
- 📱 **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- 🎭 **Loading States** - Visual feedback during operations
- 🔢 **Number Badges** - Beautiful circular badges showing task order

## 🛠 Technology Stack

### Backend
- **Spring Boot 3.1.5** - Modern Java framework
- **Spring Data JPA** - Database operations
- **MySQL** - Relational database
- **Maven** - Dependency management

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Animations** - Smooth transitions and effects

## 📁 Project Structure

```
Assignment/
├── Backend/              # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/com/todo/
│   │       │   ├── TodoApplication.java
│   │       │   ├── controller/
│   │       │   ├── entity/
│   │       │   ├── repository/
│   │       │   └── service/
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── Frontend/             # React Vite application
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskList.jsx
    │   │   └── TaskCard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🚀 Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL Server** (8.0 or higher)
- **Maven** (3.6 or higher)

## 💾 Database Setup

1. **Install MySQL Server**

2. **Create Database** (or let the app create it automatically):
   ```sql
   CREATE DATABASE todo_db;
   ```

3. **Update Configuration** in `Backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## 🔧 Backend Setup

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

✅ Backend will start on `http://localhost:8080`

## 🎨 Frontend Setup

1. **Navigate to Frontend folder:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

✅ Frontend will start on `http://localhost:3000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get recent 5 tasks in progress |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update an existing task |
| PUT | `/api/tasks/{id}/complete` | Mark a task as completed |

## 🗄 Database Schema

**Table: `task`**

| Column | Type | Description |
|--------|------|-------------|
| `task_id` | BIGINT | Primary Key, Auto-increment |
| `task_name` | VARCHAR | Task title (required) |
| `description` | VARCHAR(1000) | Task description |
| `status` | VARCHAR | "Progress" or "Completed" |
| `created_date` | DATETIME | When task was created |
| `completed_date` | DATETIME | When task was completed |

## 📖 Usage Guide

1. **Start Both Servers**
   - Backend: `mvn spring-boot:run`
   - Frontend: `npm run dev`

2. **Create a Task**
   - Fill in the title (required)
   - Add description (optional)
   - Click "Add" button

3. **Edit a Task**
   - Click "Edit" button on any task
   - Modify title and/or description
   - Click "Save" or "Cancel"

4. **Complete a Task**
   - Click "Done" button
   - Confirm the action
   - Task will be removed and numbers will auto-update

5. **Task Ordering**
   - Tasks are numbered 1-5 automatically
   - First added task appears first
   - Numbers reorder when tasks are completed

## 🎬 Animations & Effects

- **Slide In** - Cards slide in from right
- **Fade In** - Smooth appearance of elements
- **Slide Up** - Form animates upward
- **Hover Effects** - Scale and shadow changes
- **Pulse** - Loading state animation
- **Transform** - Button press effects

## 🎯 Key Features Explained

### Auto-Numbering System
Tasks are automatically numbered 1-5 based on creation order. When a task is completed, remaining tasks automatically renumber to maintain sequential order.

### Inline Editing
Click "Edit" to modify tasks directly in the card. Changes are saved to the database instantly.

### Smart Task Management
Only the 5 most recent "in progress" tasks are shown. Completed tasks are hidden but remain in the database.

## 🤝 Contributing

Feel free to fork and improve this project!

## 📄 License

This project is open source and available for educational purposes.
