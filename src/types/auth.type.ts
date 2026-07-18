import type { JWTPayload } from "jose";

export interface AuthContext {
  userId: string;
  token: string;
  claims: JWTPayload;
}
