import { createRemoteJWKSet, jwtVerify } from "jose";

import type { NextFunction, Request, Response } from "express";
import { createError } from "../utils/app-error.js";

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;
let jwksSiteUrl: string | undefined;

function getConvexSiteUrl(): string {
  const siteUrl = process.env.CONVEX_SITE_URL;

  if (!siteUrl) {
    throw createError("CONVEX_SITE_URL environment variable is not set", 500);
  }

  return siteUrl;
}

function getJwks(siteUrl: string): ReturnType<typeof createRemoteJWKSet> {
  if (!jwks || jwksSiteUrl !== siteUrl) {
    jwks = createRemoteJWKSet(new URL(`${siteUrl}/api/auth/convex/jwks`));
    jwksSiteUrl = siteUrl;
  }

  return jwks;
}

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
    const siteUrl = getConvexSiteUrl();

    const { payload } = await jwtVerify(token, getJwks(siteUrl), {
      issuer: siteUrl,
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
