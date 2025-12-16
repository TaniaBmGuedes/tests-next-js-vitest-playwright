import { makeTestTodoMocks } from '@/core/_test_/utils/make-test-todo-mocks';
import { deleteTodoAction } from './delete-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  test('calls deleteTodoUseCase with the correct values', async () => {
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const fakeId = 'any-id';
    await deleteTodoAction(fakeId);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(fakeId);
  });

  test('calls revalidatePath when the usecase returns success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const fakeId = 'any-id';
    await deleteTodoAction(fakeId);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('returns the usecase value on success', async () => {
    const { successResult } = makeTestTodoMocks();
    const fakeId = 'any-id';
    const result = await deleteTodoAction(fakeId);

    expect(result).toStrictEqual(successResult);
  });

  test('returns the usecase value on error', async () => {
    const { deleteTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    const fakeId = 'any-id';

    deleteTodoUseCaseSpy.mockResolvedValue(errorResult);

    const result = await deleteTodoAction(fakeId);

    expect(result).toStrictEqual(errorResult);
  });
});
