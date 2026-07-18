import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

const convexUrl = process.env.CONVEX_URL;

if (!convexUrl) {
  throw new Error("CONVEX_URL environment variable is not set");
}

const CONVEX_URL: string = convexUrl;

export function convexClient(token: string): ConvexHttpClient {
  const client = new ConvexHttpClient(CONVEX_URL);
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
