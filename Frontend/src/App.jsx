import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      const data = await response.json();
      // Sort by createdDate ascending (oldest first)
      const sortedTasks = data.sort((a, b) => 
        new Date(a.createdDate) - new Date(b.createdDate)
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (response.ok) {
        fetchTasks(); // Refresh the task list
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update task
  const updateTask = async (taskId, taskData) => {
    try {
      console.log('Updating task:', taskId, taskData);
      
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const updatedTask = await response.json();
        console.log('Task updated successfully:', updatedTask);
        // Force refresh the task list to show updated data
        await fetchTasks();
        return true;
      } else {
        const errorText = await response.text();
        console.error('Failed to update task:', response.status, errorText);
        alert(`Failed to update task: ${response.status} - ${errorText}`);
        return false;
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please check if the backend is running.');
      return false;
    }
  };

  // Mark task as completed
  const markAsCompleted = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/complete`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        fetchTasks(); // Refresh the task list
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-shell min-h-screen px-4 py-8 md:px-8 md:py-10 animate-fadeIn">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 md:mb-10 animate-slideDown">
          <p className="tracking-[0.18em] text-xs md:text-sm uppercase text-slate-700/80 font-semibold">
            Task Workspace
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95]">
                Plan
                <span className="block text-cyan-700">with Clarity</span>
              </h1>
              <p className="mt-3 max-w-2xl text-slate-700 text-sm md:text-base">
                Capture tasks, edit quickly, and keep momentum with a cleaner dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div className="stat-chip">
                <span className="stat-chip-label">Total</span>
                <span className="stat-chip-value">{tasks.length}</span>
              </div>
              <div className="stat-chip">
                <span className="stat-chip-label">Completed</span>
                <span className="stat-chip-value">{completedTasks}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1 animate-slideUp">
          <TaskForm onCreateTask={createTask} />
          </div>

          <div className="lg:col-span-2 animate-slideIn">
            {loading ? (
              <div className="glass-panel text-center py-20 text-slate-700 text-lg animate-pulse-slow">
                Loading tasks...
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onMarkCompleted={markAsCompleted}
                onUpdateTask={updateTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
