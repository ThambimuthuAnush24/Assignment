import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList', () => {
  const mockTasks = [
    {
      taskId: 1,
      taskName: 'Task 1',
      description: 'Description 1',
      createdDate: '2024-01-01T10:00:00',
    },
  ];

  const mockHandlers = {
    onMarkCompleted: vi.fn(),
    onUpdateTask: vi.fn(),
    onDeleteTask: vi.fn(),
  };

  it('should show empty message when no tasks', () => {
    render(<TaskList tasks={[]} {...mockHandlers} />);
    
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('should render tasks when provided', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });
});
