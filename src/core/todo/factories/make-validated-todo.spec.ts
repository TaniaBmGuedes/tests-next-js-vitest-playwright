import { makeValidatedTod } from "./make-validated-todo";
import { makeMocks } from "./make-mocks.factory";
import { ValidTodo } from "./valid-todo.contract";
import { InvalidTodo } from "./invalid-todo.contract";

describe("makeValidatedTodo (unit)", () => {
  test("should call sanitizeStr function with the correct value", () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTod(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test("should call  validateTodoDescription fcuntion with sanitizeStr function result", () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();

    const sanitizeStrReturn = "retorno da sanitizeStr";
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

    makeValidatedTod(description) as ValidTodo;

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn
    );
  });

  test("should call  makeNewTodo  function if validatedDescription  returned success", () => {
    const { description } = makeMocks();
    const result = makeValidatedTod(description) as ValidTodo;

    expect(result.success).toBe(true);

    expect(result.todo).toStrictEqual({
      id: "any",
      description,
      createdAt: expect.any(String),
    });
  });

  test('should call "return validatedDescription.error"  if validation failed', () => {
    const { errors, description, validateTodoDescriptionSpy } = makeMocks();
    validateTodoDescriptionSpy.mockReturnValue({ errors, success: false });
    const result = makeValidatedTod(description) as InvalidTodo;
    expect(result).toStrictEqual({ errors, success: false });
  });
});
