export type LoginRequestBody = {
  email: string;
  password: string;
};
export function isLoginRequestBody(body: any): body is LoginRequestBody {
  return typeof body.email === "string" && body.password === "string";
}
