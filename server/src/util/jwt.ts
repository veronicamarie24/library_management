import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { JwtSecretMissingError } from "../types/errors";

export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new JwtSecretMissingError();
}

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.user_id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
