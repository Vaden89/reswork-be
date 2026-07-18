import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCodeCandidate = (err as { statusCode?: unknown } | null)
    ?.statusCode;
  const statusCode = statusCodeCandidate ?? 500;

  const message =
    err instanceof Error && err.message ? err.message : "Internal Server Error";
  const stack = err instanceof Error ? err.stack : undefined;

  if (process.env.NODE_ENV === "development") {
    console.log(`[ERROR] ${statusCode} - ${message}`);
    if (stack) console.log(stack);
  }

  return res.status(statusCode as number).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack }),
  });
};
