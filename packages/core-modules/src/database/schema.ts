import {
  sqliteTable,
  text,
  integer,
  // real,
  // unique,
} from 'drizzle-orm/sqlite-core';

// RULES:
// - Use plural for table names
// - Join plural with `_to_` for relation tables
// - id: ulid()
// - createdAt and updatedAt: Date.now()
// - TEXT column must be NOT NULL

export const tasks = sqliteTable('tasks', {
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  id: text('id').primaryKey().notNull(),
  taskName: text('task_name').notNull(),
  taskDescription: text('task_description').notNull(),
});
