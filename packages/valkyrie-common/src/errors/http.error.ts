export class HttpError extends Error {
  constructor(public httpStatus: number, message?: string) {
    super(message);
  }
}
