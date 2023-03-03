import { NextFunction, Request, RequestHandler, Response } from 'express';

export function asyncHandler(fun: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fun(req, res, next))
      .catch(err => next(err));
  }
}
