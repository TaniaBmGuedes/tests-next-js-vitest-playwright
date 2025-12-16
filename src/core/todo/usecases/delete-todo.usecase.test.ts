import { makeTestTodoRepository } from '@/core/_test_/utils/make-test-todo-repository';
import { deleteTodoUseCase } from './delete-todo.usecase';

describe('deleteTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('returns an error when the ID is invalid', async () => {
    const result = await deleteTodoUseCase('');

    expect(result).toStrictEqual({
      errors: ['Invalid ID'],
      success: false,
    });
  });

  test('returns success when the TODO exists in the database', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);

    const result = await deleteTodoUseCase(todos[0].id);

    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });

  test('returns an error when the todo does not exist in the database', async () => {
    const result = await deleteTodoUseCase('this-does-not-exist');

    expect(result).toStrictEqual({
      errors: ['Todo does not exist'],
      success: false,
    });
  });
});
