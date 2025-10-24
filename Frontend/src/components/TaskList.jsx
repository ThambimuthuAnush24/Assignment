import React from 'react';
import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onMarkCompleted, onUpdateTask }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100 animate-fadeIn">
        <div className="text-6xl mb-4 animate-pulse-slow">📭</div>
        <p className="text-gray-500 text-lg font-medium">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <TaskCard 
          key={task.taskId} 
          task={task} 
          taskNumber={index + 1}
          onMarkCompleted={onMarkCompleted}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
