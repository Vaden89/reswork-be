import type { AuthContext } from "./auth.type.ts";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}
