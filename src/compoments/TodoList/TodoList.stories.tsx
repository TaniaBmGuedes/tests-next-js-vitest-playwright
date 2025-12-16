import React from 'react';
import { mockTodos } from '@/core/_test_/mocks/todos';
import { TodoList } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import { todoActionStoryMock } from '@/core/_test_/mocks/tod-action-story';

const meta: Meta<typeof TodoList> = {
  title: 'Components/Lists/TodoList',
  component: TodoList,
  decorators: [
    Story => (
      <div className='max-w-5xl mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    todos: { control: false },
    action: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof TodoList>;

export const Default: Story = {
  args: {
    todos: mockTodos,
    action: todoActionStoryMock.delete.success,
  },
};

export const WithError: Story = {
  args: {
    todos: mockTodos,
    action: todoActionStoryMock.delete.error,
  },
};

export const Delayed: Story = {
  args: {
    todos: mockTodos,
    action: todoActionStoryMock.delete.delayed,
  },
};

export const NoTodos: Story = {
  args: {
    todos: [],
    action: todoActionStoryMock.delete.success,
  },
};
