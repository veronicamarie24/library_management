export interface JWTPayload {
  user_id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
