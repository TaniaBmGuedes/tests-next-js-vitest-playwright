import { drizzleDatabase } from '@/db/drizzle';
import { DrizzleTodoRepository } from '../factories/repositories/drizzle-todo.repository';
import { TodoRepository } from '../factories/repositories/todo.contract.repository';

export const todoRepository: TodoRepository = new DrizzleTodoRepository(
  drizzleDatabase.db,
);