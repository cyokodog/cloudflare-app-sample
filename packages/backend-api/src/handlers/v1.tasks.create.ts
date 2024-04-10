import { error, json } from 'itty-router';
import { z } from 'zod';
import { Handler } from '../types';
import { drizzle } from '@cloudflare-app-sample/core-modules/mod/drizzle';
import { ulid as generateUlid } from '@cloudflare-app-sample/core-modules/database/utils';
import { tasks } from '@cloudflare-app-sample/core-modules/database';

const V1TasksInputSchema = z.object({
  taskName: z.string(),
  taskDescription: z.string().optional(),
});

const V1TasksCreateOutputSchema = z.object({
  id: z.string(),
});

export const handler: Handler = async (req, env) => {
  const input = await req.json().catch(() => ({}));
  const parsed = V1TasksInputSchema.safeParse(input);
  if (!parsed.success) return error(400);

  const [taskId, now] = [generateUlid(), Date.now()];
  const db = drizzle(env.DB);
  await db.insert(tasks).values({
    createdAt: now,
    updatedAt: now,
    id: taskId,
    taskName: parsed.data.taskName,
    taskDescription: parsed.data.taskDescription || '',
  });

  return json(
    V1TasksCreateOutputSchema.parse({
      id: taskId,
    })
  );
};
