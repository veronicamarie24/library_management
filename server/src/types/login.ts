import { Role } from "./auth";

export interface UserResponse {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

export type LoginRequestBody = {
  email: string;
  password: string;
};
export function isLoginRequestBody(body: any): body is LoginRequestBody {
  return typeof body.email === "string" && typeof body.password === "string";
}

export type LoginResponse = {
  user: UserResponse;
  token: string;
};
