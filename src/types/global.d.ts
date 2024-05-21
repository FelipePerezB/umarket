export {};

export type Roles = "admin" | "moderator" | "authorized" | "user";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
