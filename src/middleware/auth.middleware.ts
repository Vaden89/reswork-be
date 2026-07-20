import { createRemoteJWKSet, jwtVerify } from "jose";

import type { NextFunction, Request, Response } from "express";
import { createError } from "../utils/app-error.js";

const siteUrl = process.env.CONVEX_SITE_URL;

if (!siteUrl) {
  throw new Error("CONVEX_SITE_URL environment variable is not set");
}

const CONVEX_SITE_URL: string = siteUrl;

const jwks = createRemoteJWKSet(
  new URL(`${CONVEX_SITE_URL}/api/auth/convex/jwks`),
);

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createError("Unauthorized", 401);
  }

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;

  if (!token) {
    throw createError("Unauthorized", 401);
  }

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: CONVEX_SITE_URL,
      audience: "convex",
    });

    if (!payload.sub) {
      throw new Error("Token is missing a subject claim");
    }

    req.auth = { userId: payload.sub, token, claims: payload };

    next();
  } catch (error) {
    next(error);
  }
}
