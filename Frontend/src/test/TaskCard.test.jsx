import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../components/TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    taskId: 1,
    taskName: 'Test Task',
    description: 'Test Description',
    createdDate: '2024-01-01T10:00:00',
  };

  const mockHandlers = {
    onMarkCompleted: vi.fn(),
    onUpdateTask: vi.fn(),
    onDeleteTask: vi.fn(),
  };

  it('should render task details', () => {
    render(<TaskCard task={mockTask} taskNumber={1} {...mockHandlers} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TaskCard task={mockTask} taskNumber={1} {...mockHandlers} />);
    
    expect(screen.getByTitle('Delete task')).toBeInTheDocument();
  });

  it('should call delete handler when delete clicked', async () => {
    window.confirm = vi.fn(() => true);
    render(<TaskCard task={mockTask} taskNumber={1} {...mockHandlers} />);
    
    const deleteBtn = screen.getByTitle('Delete task');
    await userEvent.click(deleteBtn);
    
    expect(mockHandlers.onDeleteTask).toHaveBeenCalledWith(1);
  });
});
