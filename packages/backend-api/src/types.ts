import type { IRequestStrict, RequestHandler } from 'itty-router';

export type Handler = RequestHandler<IRequestStrict, [Env]>;

export type Env = {
  DB: D1Database;
};
