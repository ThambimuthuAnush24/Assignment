import React, { useState } from 'react';

function TaskCard({ task, taskNumber, onMarkCompleted, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedName, setEditedName] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const isCompleted = typeof task.completed === 'boolean'
    ? task.completed
    : (task.status || '').toLowerCase() === 'completed';

  // Update local state when task prop changes
  React.useEffect(() => {
    setEditedName(task.taskName);
    setEditedDescription(task.description || '');
  }, [task.taskName, task.description]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return 'Date unavailable';
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleComplete = () => {
    if (isCompleted) {
      return;
    }

    if (window.confirm('Mark this task as completed?')) {
      onMarkCompleted(task.taskId);
    }
  };

  const handleDelete = () => {
    if (!onDeleteTask) {
      return;
    }

    if (window.confirm('Delete this task permanently?')) {
      onDeleteTask(task.taskId);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editedName.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }

    setIsSaving(true);
    
    try {
      console.log('Saving task with ID:', task.taskId);
      console.log('New values:', { taskName: editedName, description: editedDescription });
      
      // Always update to ensure both UI and database are in sync
      const success = await onUpdateTask(task.taskId, {
        taskName: editedName,
        description: editedDescription,
      });
      
      if (success !== false) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedName(task.taskName);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  return (
    <div className={`task-card rounded-2xl p-4 md:p-5 transition-all duration-300 border animate-slideIn ${isCompleted ? 'task-card-completed border-emerald-300/70' : 'border-slate-300/80 hover:border-cyan-700/60'}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-slate-900 text-cyan-200 rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
            {taskNumber}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3 animate-fadeIn">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 font-semibold text-slate-900"
                placeholder="Task title"
                disabled={isSaving}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-slate-700 resize-none"
                rows="2"
                placeholder="Task description"
                disabled={isSaving}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.03] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>Save</>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.03] active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-lg md:text-xl font-black text-slate-900 break-words leading-tight">
                  {task.taskName}
                </h3>
                <span className={`status-pill ${isCompleted ? 'status-pill-done' : 'status-pill-progress'}`}>
                  {isCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>
              
              {task.description && (
                <p className="text-slate-700 text-sm leading-relaxed break-words mb-2">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(task.createdDate)}</span>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex flex-wrap justify-end gap-2 flex-shrink-0 self-center">
            <button 
              onClick={handleEdit}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-lg font-semibold transition-all duration-200 whitespace-nowrap transform hover:scale-[1.03] active:scale-95 shadow-md text-sm"
              title="Edit task"
            >
              Edit
            </button>
            <button 
              onClick={handleComplete}
              disabled={isCompleted}
              className="px-4 py-2 bg-cyan-50 hover:bg-cyan-100 border border-cyan-700 text-cyan-900 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap transform hover:scale-[1.03] active:scale-95 shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              title="Mark as done"
            >
              {isCompleted ? 'Done' : 'Complete'}
            </button>
            {onDeleteTask && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-500 text-rose-700 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap transform hover:scale-[1.03] active:scale-95 shadow-sm text-sm"
                title="Delete task"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
