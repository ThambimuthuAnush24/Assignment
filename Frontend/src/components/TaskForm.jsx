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

    setTaskName('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="form-panel glass-panel sticky top-6 h-fit rounded-[1.75rem] p-6 md:p-7">
      <div className="mb-7">
        <div className="hero-kicker inline-flex">Create task</div>
        <h2 className="mt-3 text-3xl font-black leading-none text-slate-950 md:text-4xl">New Action</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Write a clear title and short context to keep execution sharp.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="hero-chip">Focus</span>
        <span className="hero-chip">Plan</span>
        <span className="hero-chip">Ship</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="taskName" className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
            <svg className="h-5 w-5 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3.5 text-slate-800 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-cyan-600 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            disabled={isSubmitting}
          />
        </div>

        <div className="relative">
          <label htmlFor="description" className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
            <svg className="h-5 w-5 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full resize-none rounded-xl border border-slate-300 bg-white/90 px-4 py-3.5 text-slate-800 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-cyan-600 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            rows="5"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-button w-full rounded-xl bg-slate-900 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-950 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Adding Task...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">Add Task</span>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-300/70 pt-6">
        <div className="flex items-center justify-center gap-2 text-xs leading-6 text-slate-500">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Strong task titles make execution faster</span>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
