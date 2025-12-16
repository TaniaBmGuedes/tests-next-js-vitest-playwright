import { makeTestTodoRepository } from '@/core/_test_/utils/make-test-todo-repository';
import { InvalidTodo } from '../factories/invalid-todo.contract';
import { ValidTodo } from '../schemas/todo.contract';
import { createTodoUseCase } from './create-todo.usecase';

describe('createTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('returns an error when validation fails', async () => {
    const result = (await createTodoUseCase('')) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  test('returns the todo when validation passes', async () => {
    const description = 'This should work';
    const result = (await createTodoUseCase(description)) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      createdAt: expect.any(String),
      description,
      id: expect.any(String),
    });
  });

  test('returns an error when the repository fails', async () => {
    // Create the todo once
    const description = 'This only works once';
    (await createTodoUseCase(description)) as ValidTodo;

    // Attempt to recreate the todo and it SHOULD return an error
    const result = (await createTodoUseCase(description)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      'A todo with the provided id or description already exists',
    ]);
  });
});
