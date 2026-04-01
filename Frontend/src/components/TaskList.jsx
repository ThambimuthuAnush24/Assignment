import React from 'react';
import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onMarkCompleted, onUpdateTask }) {
  if (tasks.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center animate-fadeIn">
        <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-slate-900 text-cyan-200 grid place-items-center shadow-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h5l2 3h11v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
          </svg>
        </div>
        <p className="text-slate-700 text-lg font-semibold">No tasks yet. Create one to get started!</p>
        <p className="text-slate-500 text-sm mt-2">Your upcoming priorities will appear here.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-4 md:p-5">
      <div className="mb-4 px-1 flex items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-black text-slate-900">Task Queue</h2>
        <span className="text-xs md:text-sm text-slate-600 font-semibold tracking-wide uppercase">{tasks.length} items</span>
      </div>

      <div className="space-y-3">
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
    </div>
  );
}

export default TaskList;
