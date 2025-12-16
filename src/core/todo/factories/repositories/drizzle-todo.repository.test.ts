import { insertTestTodos, makeTestTodoRepository } from '@/core/_test_/utils/make-test-todo-repository';


describe('DrizzleTodoRepository (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe('findAll', () => {
    test('returns an empty array when the table is clear', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test('returns all TODOs in descending order', async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();
      expect(result[0].createdAt).toBe('date 4');
      expect(result[1].createdAt).toBe('date 3');
      expect(result[2].createdAt).toBe('date 2');
      expect(result[3].createdAt).toBe('date 1');
      expect(result[4].createdAt).toBe('date 0');
    });
  });

  describe('create', () => {
    test('creates a todo when the data is valid', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);
      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test('fails if a duplicate description exists in the table', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Create a new todo
      await repository.create(todos[0]);

      // Attempt to create another todo with the same description
      const anotherTodo = {
        id: 'any id',
        description: todos[0].description,
        createdAt: 'any date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['A todo with the provided id or description already exists'],
      });
    });

    test('fails if a duplicate ID exists in the table', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Create a new todo
      await repository.create(todos[0]);

      // Attempt to create another todo with the same ID
      const anotherTodo = {
        id: todos[0].id,
        description: 'any description',
        createdAt: 'any date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['A todo with the provided id or description already exists'],
      });
    });

    test('fails if both the ID and description are duplicates', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      await repository.create(todos[0]);

      const anotherTodo = {
        id: todos[0].id,
        description: todos[0].description,
        createdAt: 'any date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['A todo with the provided id or description already exists'],
      });
    });
  });

  describe('remove', () => {
    test('deletes a todo if it exists', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove(todos[0].id);

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test('fails to delete when the todo does not exist', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.remove('any id');

      expect(result).toStrictEqual({
        success: false,
        errors: ['Todo does not exist'],
      });
    });
  });
});
