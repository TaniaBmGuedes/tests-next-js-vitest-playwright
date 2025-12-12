import { sanitizeStr } from "@/utils/sanitize-str";
import { InvalidTodo } from "./invalid-todo.contract";
import { ValidTodo } from "./valid-todo.contract";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";

type MakeValidatedTod = ValidTodo | InvalidTodo;

export function makeValidatedTod(description: string): MakeValidatedTod {
  const cleandDescription = sanitizeStr(description);
  const validateDescription = validateTodoDescription(cleandDescription);

  if (validateDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleandDescription),
    };
  }
  return {
    success: false,
    errors: validateDescription.errors,
  };
}
