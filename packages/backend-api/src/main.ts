import {
  Router as createRouter,
  // html,
  // json,
  error,
  cors,
} from 'itty-router';
import * as v1TasksCreate from './handlers/v1.tasks.create';
import { Env } from './types';

// Main app routes defs ---
const { preflight, corsify } = cors({
  // Allow all but master|access key is required for all endpoints
  origin: ['*'],
  // All endpoints are implemented with POST method only
  allowMethods: ['POST'],
});

const noCachify = (resp: Response) => {
  resp.headers.set('Cache-Control', 'no-store');
  return resp;
};

// TODO: Report somewhere
const createErrorHandler = () => (err: Error) => {
  console.error('💥', err);
  return error(500);
};

const router = createRouter()
  .all('*', preflight)
  .post('/v1/tasks/create', v1TasksCreate.handler)
  .all('*', () => error(404));

export default {
  fetch: (...args) => {
    const errHandler = createErrorHandler();

    return router
      .fetch(...args)
      .catch(errHandler)
      .then(corsify)
      .then(noCachify);
  },
} satisfies ExportedHandler<Env>;
