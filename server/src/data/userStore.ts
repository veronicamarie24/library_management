import { User } from "../models/userModel";
import bcrypt from "bcrypt";

// Key: email
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
    role: "user",
  };

  const admin: User = {
    user_id: "admin-1",
    name: "John Doe",
    email: "admin@example.com",
    password: adminPassword,
    role: "admin",
  };

  users.set(user.email, user);
  users.set(admin.email, admin);
};
