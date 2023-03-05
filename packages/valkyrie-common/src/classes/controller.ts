import express, { RequestHandler } from 'express';
import { asyncHandler } from '../handlers/async.handler';

export class Controller {
  router = express.Router();

  use(handler: RequestHandler, path?: string) {
    if (path) this.router.use(path, handler)
    else this.router.use(handler)
  }

  all(path: string, ...handlers: RequestHandler[]) {
    const routeHandler = handlers.pop();
    this.router.all(path, ...handlers, asyncHandler(routeHandler!));
  }

  get(path: string, ...handlers: RequestHandler[]) {
    const routeHandler = handlers.pop();
    this.router.get(path, ...handlers, asyncHandler(routeHandler!));
  }

  post(path: string, ...handlers: RequestHandler[]) {
    const routeHandler = handlers.pop();
    this.router.post(path, ...handlers, asyncHandler(routeHandler!));
  }

  put(path: string, ...handlers: RequestHandler[]) {
    const routeHandler = handlers.pop();
    this.router.put(path, ...handlers, asyncHandler(routeHandler!));
  }

  patch(path: string, ...handlers: RequestHandler[]) {
    const routeHandler = handlers.pop();
    this.router.patch(path, ...handlers, asyncHandler(routeHandler!));
  }

  delete(path: string, ...handlers: RequestHandler[]) {
    const routeHandler = handlers.pop();
    this.router.delete(path, ...handlers, asyncHandler(routeHandler!));
  }
}
