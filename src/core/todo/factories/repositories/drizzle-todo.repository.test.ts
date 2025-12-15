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
    test('returns an empty array when the table is empty', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test('returns all todos in descending order', async () => {
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
    test('creates a todo when data is valid', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);
      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test('fails when the description already exists', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com a mesma descrição
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

    test('fails when the id already exists', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com o mesmo ID
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

    test('fails when both id and description already exist', async () => {
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
    test('deletes a todo when it exists', async () => {
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
