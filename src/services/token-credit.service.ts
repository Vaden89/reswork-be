import { convexClient, deductTokens, getTokenCount } from "../lib/convex.js";
import { createError } from "../utils/app-error.js";

export type TokenCreditCheck =
  | { ok: true; available: number }
  | { ok: false; available: number; message: string };

export async function checkTokenCredit(
  authToken: string,
  cost: number,
): Promise<TokenCreditCheck> {
  const convex = convexClient(authToken);

  const tokenCount = (await convex.query(getTokenCount, {})) as number | null;

  const available = tokenCount ?? 0;

  if (available < cost) {
    return { ok: false, available, message: "Insufficient tokens" };
  }

  return { ok: true, available };
}

export async function deductTokenCredit(
  authToken: string,
  amount = 1,
): Promise<void> {
  const convex = convexClient(authToken);

  try {
    await convex.mutation(deductTokens, {
      amount,
    });
  } catch (error) {
    const data = error as {
      data?: { code?: string; message?: string; balance?: number };
      message?: string;
    };

    if (data.data?.message) throw createError(data.data.message, 400);

    throw createError("Internal server error", 500);
  }
}
