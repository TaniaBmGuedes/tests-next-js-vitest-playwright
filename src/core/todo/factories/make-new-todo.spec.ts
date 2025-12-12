import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo (unit)", () => {
  test("should return a new valid todo", () => {
    const expectedTodo = {
      id: expect.any(String),
      description: "my new todo",
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo("my new todo");

    expect(newTodo.description).toBe(expectedTodo.description);
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
