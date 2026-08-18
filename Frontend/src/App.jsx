import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import StatsOverview from './components/StatsOverview.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const isTaskCompleted = (task) => {
    if (typeof task.completed === 'boolean') {
      return task.completed;
    }
    return (task.status || '').toLowerCase() === 'completed';
  };

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

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
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

  return (
    <>
      <Navbar />
      <div className="app-shell min-h-screen pt-20 px-4 py-8 md:px-8 md:py-10 animate-fadeIn">
        <div className="bg-orb bg-orb-a" />
        <div className="bg-orb bg-orb-b" />
        <div className="mx-auto w-full max-w-6xl">
          {/* Hero Section */}
          <HeroSection />

          {/* Stats Overview */}
          <StatsOverview tasks={tasks} />

          {/* Main Content Section */}
          <div id="tasks" className="py-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">Manage Tasks</h2>
            
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
                    onDeleteTask={deleteTask}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
