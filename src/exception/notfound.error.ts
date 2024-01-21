export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message) {
    super(message);
  }
}
