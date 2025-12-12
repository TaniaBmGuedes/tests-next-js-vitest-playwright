import { Todo } from '../schemas/todo.contract';

export type ValidTodo = {
    success: true;
    data: Todo;
};