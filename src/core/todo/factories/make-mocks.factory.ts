import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import * as makeNewTodoMod from "../factories/make-new-todo";

export const makeMocks = (description = "abcd") => {
  const errors = ["any", "error"];
  const todo = {
    id: "any",
    description,
    createdAt: new Date().toISOString(),
  };
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);
  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({
      errors: [],
      success: true,
    });
  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);
  return {
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
    todo,
    errors,
  };
};
