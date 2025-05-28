import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { Role } from "../types/auth";

// Key: user_id
export const users = new Map<string, User>();

export const initializeUserStore = async () => {
  const saltRounds = 10;

  const userPassword = await bcrypt.hash("user123", saltRounds);
  const adminPassword = await bcrypt.hash("admin123", saltRounds);

  const user: User = {
    user_id: "user-1",
    name: "Jane Doe",
    email: "user@example.com",
    password: userPassword,
    role: Role.USER,
  };

  const admin: User = {
    user_id: "admin-1",
    name: "John Doe",
    email: "admin@example.com",
    password: adminPassword,
    role: Role.ADMIN,
  };

  users.set(user.user_id, user);
  users.set(admin.user_id, admin);
};
