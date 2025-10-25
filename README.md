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
- **Docker** - Containerization

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Animations** - Smooth transitions and effects
- **Docker** - Containerization

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
│   ├── pom.xml
│   └── Dockerfile        # Backend Docker configuration
├── Frontend/             # React Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile        # Frontend Docker configuration
├── docker-compose.yml    # Docker Compose orchestration
└── README.md
```

## 🚀 Prerequisites

### Before Docker (Traditional Setup)
- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL Server** (8.0 or higher)
- **Maven** (3.6 or higher)

### After Docker (Simplified Setup)
- **Docker Desktop** (20.10 or higher)
- **Docker Compose** (v2.0 or higher)

## 📋 What Was Done Before Docker

### Manual Setup Steps (OLD METHOD)
1. ❌ Install Java JDK 17
2. ❌ Install Node.js and npm
3. ❌ Install MySQL Server locally
4. ❌ Configure MySQL user and password
5. ❌ Create database manually
6. ❌ Install Maven
7. ❌ Configure application.properties with local settings
8. ❌ Run `mvn clean install` for backend
9. ❌ Run `npm install` for frontend
10. ❌ Start MySQL service
11. ❌ Start backend with `mvn spring-boot:run`
12. ❌ Start frontend with `npm run dev`
13. ❌ Manage multiple terminal windows
14. ❌ Deal with port conflicts
15. ❌ Handle environment-specific configurations

### Challenges Before Docker
- 🔧 Complex environment setup
- 💻 "Works on my machine" problems
- 🔄 Difficult to share with team members
- ⚙️ Manual dependency management
- 📦 Multiple installation steps
- 🐛 Version compatibility issues

## 📋 What Was Done After Docker

### Simple Setup Steps (NEW METHOD)
1. ✅ Install Docker Desktop only
2. ✅ Run `docker-compose up`
3. ✅ Everything works! 🎉

### Benefits After Docker
- 🚀 One-command deployment
- 📦 All dependencies containerized
- 🔄 Consistent across all environments
- 🛡️ Isolated and secure
- 🔧 No manual configuration needed
- 👥 Easy team collaboration
- 🌍 Works on Windows, Mac, Linux

## 🐳 Docker Setup (RECOMMENDED)

### 1️⃣ Quick Start

**Single Command to Start Everything:**
```bash
docker-compose up --build
```

**Or run in detached mode:**
```bash
docker-compose up -d --build
```

### 2️⃣ Docker Architecture

```
┌─────────────────────────────────────────────┐
│           Docker Compose Network            │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │   Frontend   │  │   Backend    │        │
│  │   (React)    │  │ (Spring Boot)│        │
│  │              │  │              │        │
│  │  Port: 3000  │  │  Port: 8080  │        │
│  └──────┬───────┘  └──────┬───────┘        │
│         │                 │                 │
│         │                 │                 │
│         │          ┌──────▼───────┐         │
│         │          │    MySQL     │         │
│         │          │   Database   │         │
│         │          │              │         │
│         │          │  Port: 3306  │         │
│         │          └──────────────┘         │
│         │                                    │
│         └─────► API Calls ─────►            │
│                                             │
└─────────────────────────────────────────────┘
```

### 3️⃣ Docker Services

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| Frontend | todo-frontend | 3000 | React Vite Application |
| Backend | todo-backend | 8080 | Spring Boot REST API |
| Database | todo-mysql | 3306 | MySQL 8.0 Database |

### 4️⃣ Docker Files Overview

**Frontend Dockerfile:**
```dockerfile
# Multi-stage build for optimized image
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
```

**Backend Dockerfile:**
```dockerfile
# Multi-stage build for optimized image
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**View logs:**
```bash
docker-compose logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mysql
```

**View running containers:**
```bash
docker-compose ps
```

**Restart a specific service:**
```bash
docker-compose restart backend
```

**Execute commands in container:**
```bash
docker-compose exec backend bash
docker-compose exec mysql mysql -uroot -p
```

## 💾 Database Setup

### With Docker (Automatic)
✅ Database is automatically created and configured!
- Database name: `todo_db`
- Username: `root`
- Password: `root123`

### Without Docker (Manual)

1. **Install MySQL Server**

2. **Create Database**:
   ```sql
   CREATE DATABASE todo_db;
   ```

3. **Update Configuration** in `Backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/todo_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## 🔧 Traditional Setup (Without Docker)

### Backend Setup

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

### Frontend Setup

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

## 🌐 How to Access Everything

### 🖥️ Application URLs

| Component | URL | Description |
|-----------|-----|-------------|
| 🎨 **Frontend** | http://localhost:3000 | Main Todo Application UI |
| ⚙️ **Backend API** | http://localhost:8080/api/tasks | REST API Endpoints |
| 💾 **MySQL** | localhost:3306 | Database Connection |

### 🔌 API Endpoints

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/api/tasks` | Get recent 5 tasks | `GET http://localhost:8080/api/tasks` |
| POST | `/api/tasks` | Create a new task | `POST http://localhost:8080/api/tasks` |
| PUT | `/api/tasks/{id}` | Update a task | `PUT http://localhost:8080/api/tasks/1` |
| PUT | `/api/tasks/{id}/complete` | Mark as completed | `PUT http://localhost:8080/api/tasks/1/complete` |

### 📝 API Request Examples

**Create Task:**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Learn Docker",
    "description": "Complete Docker tutorial"
  }'
```

**Get All Tasks:**
```bash
curl http://localhost:8080/api/tasks
```

**Update Task:**
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Updated Task",
    "description": "Updated description"
  }'
```

**Complete Task:**
```bash
curl -X PUT http://localhost:8080/api/tasks/1/complete
```

### 🗄️ Database Access

**With Docker:**
```bash
# Access MySQL CLI
docker-compose exec mysql mysql -uroot -proot123

# Use database
USE todo_db;

# View tasks
SELECT * FROM task;
```

**With MySQL Workbench or any client:**
- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `root123`
- Database: `todo_db`

### 🔍 Monitoring & Debugging

**View Container Logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

**Check Container Status:**
```bash
docker-compose ps
```

**Container Resource Usage:**
```bash
docker stats
```

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

### Using Docker (Recommended)

1. **Start the Application**
   ```bash
   docker-compose up -d
   ```

2. **Access the Application**
   - Open browser: http://localhost:3000

3. **Stop the Application**
   ```bash
   docker-compose down
   ```

### Using Traditional Method

1. **Start All Services**
   - Terminal 1: Start MySQL
   - Terminal 2: `cd Backend && mvn spring-boot:run`
   - Terminal 3: `cd Frontend && npm run dev`

2. **Access the Application**
   - Open browser: http://localhost:3000

3. **Create a Task**
   - Fill in the title (required)
   - Add description (optional)
   - Click "Add" button

4. **Edit a Task**
   - Click "Edit" button on any task
   - Modify title and/or description
   - Click "Save" or "Cancel"

5. **Complete a Task**
   - Click "Done" button
   - Confirm the action
   - Task will be removed and numbers will auto-update

6. **Task Ordering**
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

## 🔒 Security Notes

- Default credentials are for development only
- Change passwords in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Configure CORS properly for production

## 🐛 Troubleshooting

### Docker Issues

**Containers won't start:**
```bash
docker-compose down -v
docker-compose up --build
```

**Port already in use:**
```bash
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :8080

# Kill the process or change port in docker-compose.yml
```

**Database connection issues:**
```bash
# Wait for MySQL to be ready (30 seconds)
docker-compose logs mysql
```

### Traditional Setup Issues

**Backend won't start:**
- Check Java version: `java -version`
- Verify MySQL is running
- Check application.properties

**Frontend won't start:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node -v`

## 📊 Performance

- Docker images use multi-stage builds for optimization
- Frontend: Production build with nginx (< 50MB)
- Backend: Optimized JAR file (< 100MB)
- MySQL: Persistent volume for data

## 🤝 Contributing

Feel free to fork and improve this project!

## 📄 License

This project is open source and available for educational purposes.

---

## 🎓 Learning Resources

- **Docker**: https://docs.docker.com/
- **Spring Boot**: https://spring.io/projects/spring-boot
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

Made with ❤️ using Docker, Spring Boot, React, and MySQL
