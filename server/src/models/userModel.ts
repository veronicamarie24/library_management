import { Role } from "../types/auth";

export interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
