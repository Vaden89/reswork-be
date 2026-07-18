export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number): AppError =>
  new AppError(message, statusCode);

export const rethrowAppError = (error: unknown, context: string): never => {
  if (error instanceof AppError) {
    throw error;
  }

  console.log(`An unexpected error occured at ${context}: `, error);
  throw createError("Internal Server Error", 500);
};
