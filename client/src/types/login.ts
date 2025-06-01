export interface LoginForm {
  email: string;
  password: string;
}

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
export function isLoginRequestBody(body: unknown): body is LoginRequestBody {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const obj = body as Record<string, unknown>;
  return typeof obj.email === "string" && typeof obj.password === "string";
}

export type LoginResponse = {
  user: UserResponse;
  token: string;
};

export type Role = "admin" | "user";
