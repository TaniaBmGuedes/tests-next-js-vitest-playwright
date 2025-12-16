type ValidateTodoDescription = {
  success: boolean;
  errors: string[];
};
export function validateTodoDescription(
  description: string,
): ValidateTodoDescription {
  const errors = [];

  if (description.length <= 3) {
    errors.push('Description needs to have more than 3 characters');
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
