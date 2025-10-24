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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Add Task Form */}
        <div className="lg:col-span-1 animate-slideUp">
          <TaskForm onCreateTask={createTask} />
        </div>

        {/* Right Section - Task List */}
        <div className="lg:col-span-2 animate-slideIn">
          {loading ? (
            <div className="text-center py-20 text-gray-500 text-lg animate-pulse-slow">
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
  );
}

export default App;
