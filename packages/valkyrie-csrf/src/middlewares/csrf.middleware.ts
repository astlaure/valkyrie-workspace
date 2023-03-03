import { NextFunction, Request, RequestHandler, Response } from 'express';
import Tokens from 'csrf';

declare module 'express-session' {
  interface SessionData {
    _csrf?: { secret: string };
  }
}

export function csrf(): RequestHandler {
  const tokens = new Tokens();
  const ignoredMethods = ['GET', 'PREFLIGHT', 'HEAD', 'TRACE'];

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session) {
      return next(new Error("The CSRF middleware needs a session to work."));
    }

    if (!req.session._csrf) {
      req.session._csrf = { secret: await tokens.secret() };
    }

    const newToken = tokens.create(req.session._csrf.secret);
    res.cookie('XSRF-TOKEN', newToken, { httpOnly: false });
    res.locals.csrfToken = newToken;

    if (ignoredMethods.includes(req.method.toUpperCase())) {
      return next();
    }

    const token = req.header('X-XSRF-TOKEN') || req.body.csrf;

    if (!token || !tokens.verify(req.session._csrf.secret, token)) {
      return next(new Error("Bad CSRF Token."));
    }

    return next();
  }
}
