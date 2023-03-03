import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof HttpError ? err.httpStatus : 500;
  return res.status(status).json({ message: err.message });
}
