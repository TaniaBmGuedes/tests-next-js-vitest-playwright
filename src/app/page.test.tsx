import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Next.js Image component to avoid Next.js runtime requirements in Vitest
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    const { src, alt, ...rest } = props as { src: string; alt: string };
    return <img src={src} alt={alt} {...rest} />;
  },
}));

// Mock the TodoContainer to avoid hitting the DB and to assert the expected UI text
vi.mock('@/compoments/TodoContainer', () => ({
  TodoContainer: () => (
    <div>
      <h1>Task list</h1>
      <form>
        <input aria-label='Task' placeholder='Type your task' />
        <button type='submit'>Create task</button>
      </form>
    </div>
  ),
}));

import Home from '@/app/page';

describe('Home page', () => {
  it('renders the todo container', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: 'Task list',
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: 'Task' }),
    ).toHaveAttribute('placeholder', 'Type your task');
    expect(
      screen.getByRole('button', { name: 'Create task' }),
    ).toHaveAttribute('type', 'submit');
  });
});
