import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('should render form fields', () => {
    const mockOnCreate = vi.fn();
    render(<TaskForm onCreateTask={mockOnCreate} />);
    
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/task description/i)).toBeInTheDocument();
  });

  it('should call onCreate when form submitted', async () => {
    const mockOnCreate = vi.fn();
    render(<TaskForm onCreateTask={mockOnCreate} />);
    
    const titleInput = screen.getByPlaceholderText(/task title/i);
    const submitBtn = screen.getByRole('button', { name: /add task/i });
    
    await userEvent.type(titleInput, 'New Task');
    await userEvent.click(submitBtn);
    
    expect(mockOnCreate).toHaveBeenCalled();
  });
});
