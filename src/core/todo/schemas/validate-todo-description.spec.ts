import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  test("should return errors when description have less than 4 characters", () => {
    const description = "abc";
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([
      "Description needs to have more than 3 characters",
    ]);
    expect(result.success).toBe(false);
  });
  test("should return sucess when description have more than 3 characters", () => {
 const description = "abcd";
    const result = validateTodoDescription(description);
     expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
