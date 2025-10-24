import React, { useState } from 'react';

function TaskCard({ task, taskNumber, onMarkCompleted, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedName, setEditedName] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  // Update local state when task prop changes
  React.useEffect(() => {
    setEditedName(task.taskName);
    setEditedDescription(task.description || '');
  }, [task.taskName, task.description]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleComplete = () => {
    if (window.confirm('Mark this task as completed?')) {
      onMarkCompleted(task.taskId);
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
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-400 hover:border-blue-600 transform hover:-translate-y-1 animate-slideIn">
      <div className="flex items-start gap-4">
        {/* Task Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            {taskNumber}
          </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3 animate-fadeIn">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900"
                placeholder="Task title"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
                rows="2"
                placeholder="Task description"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
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
                    <>✓ Save</>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5 break-words leading-tight">
                {task.taskName}
              </h3>
              
              {task.description && (
                <p className="text-gray-700 text-sm leading-relaxed break-words mb-2">
                  {task.description}
                </p>
              )}

              {/* Date Display */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(task.createdDate)}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium transition-all duration-200 whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md text-sm"
              title="Edit task"
            >
              Edit
            </button>
            <button 
              onClick={handleComplete}
              className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-400 hover:border-gray-600 text-gray-700 rounded-lg font-medium transition-all duration-200 whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md text-sm"
              title="Mark as done"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
