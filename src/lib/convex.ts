import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

function getConvexUrl(): string {
  const convexUrl = process.env.CONVEX_URL;

  if (!convexUrl) {
    throw new Error("CONVEX_URL environment variable is not set");
  }

  return convexUrl;
}

export function convexClient(token: string): ConvexHttpClient {
  const client = new ConvexHttpClient(getConvexUrl());
  client.setAuth(token);
  return client;
}

export const getCurrentUser = makeFunctionReference<"query">(
  "auth:getCurrentUser",
);

export const getTokenCount = makeFunctionReference<"query">(
  "tokens:getTokenCount",
);

export const deductTokens = makeFunctionReference<"mutation">(
  "tokens:deductTokens",
);
