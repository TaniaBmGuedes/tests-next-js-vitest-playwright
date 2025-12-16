
import { CreateTodoAction, DeleteTodoAction } from '@/core/todo/actions/todo.actions.types';
import { fn } from '@storybook/test';

export const todoActionStoryMock = {
  create: {
    success: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'description', createdAt: 'date' },
      };
    }) as CreateTodoAction,
    error: fn(async () => {
      return {
        success: false,
        errors: ['failed to create todo'],
      };
    }) as CreateTodoAction,
  },
  delete: {
    success: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'description', createdAt: 'date' },
      };
    }) as DeleteTodoAction,
    error: fn(async () => {
      return {
        success: false,
        errors: ['failed to create todo'],
      };
    }) as DeleteTodoAction,
    delayed: fn(async () => {
      await new Promise(r => setTimeout(r, 2000));
      return {
        success: true,
        todo: { id: 'id', description: 'description', createdAt: 'date' },
      };
    }) as DeleteTodoAction,
  },
};
