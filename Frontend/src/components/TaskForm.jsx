import React, { useState } from 'react';

function TaskForm({ onCreateTask }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (taskName.trim() === '') {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    
    await onCreateTask({
      taskName: taskName,
      description: description,
    });

    // Clear form
    setTaskName('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-7 h-fit sticky top-6 form-panel">
      <div className="mb-7">
        <div className="hero-kicker inline-flex">Create task</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-950 leading-none">New Action</h2>
        <p className="mt-3 text-sm text-slate-700 leading-7">
          Write a clear title and short context to keep execution sharp.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="taskName" className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
            <svg className="w-5 h-5 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Title
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-3.5 bg-white/90 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 hover:border-cyan-600 placeholder-slate-400 text-slate-800 font-medium shadow-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="relative">
          <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
            <svg className="w-5 h-5 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full px-4 py-3.5 bg-white/90 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 resize-none hover:border-cyan-600 placeholder-slate-400 text-slate-800 shadow-sm"
            rows="5"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-button w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-lg">Adding Task...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 text-lg">
              Add Task
            </span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-300/70">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 leading-6">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Strong task titles make execution faster</span>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
