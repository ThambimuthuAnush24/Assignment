import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App navigation and home screen', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      })
    );
  });

  it('renders the home hero and the settings section in the navigation flow', async () => {
    render(<App />);

    expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /stay organized/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /workspace settings/i })).toBeInTheDocument();
  });
});
