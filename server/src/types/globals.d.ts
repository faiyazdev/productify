import { UserRole } from "../db/schema/users.ts";

export {};

declare global {
  interface CustomJwtSessionClaims {
    dbId?: string;
    role?: UserRole;
  }
  interface UserPublicMetadata {
    dbId?: string;
    role?: UserRole;
  }
}
