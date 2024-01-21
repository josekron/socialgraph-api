export class DuplicateError extends Error {
  statusCode = 409;
  constructor(message) {
    super(message);
  }
}
