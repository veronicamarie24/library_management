import { Request, Response } from "express";
import { isLoginRequestBody, LoginRequestBody } from "../types/login";
import {
  AppError,
  InvalidPasswordError,
  InvalidRequestBodyError,
  UserNotFoundError,
} from "../types/errors";
import { users } from "../data/userStore";
import bcrypt from "bcrypt";
import { generateToken } from "../util/jwt";

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  try {
    const { body } = req;

    if (!isLoginRequestBody(body)) {
      throw new InvalidRequestBodyError();
    }

    const { email, password } = body;
    const fetchedUser = users.get(email);

    if (!fetchedUser) {
      throw new UserNotFoundError();
    }

    if (!(await verifyPassword(password, fetchedUser.password))) {
      throw new InvalidPasswordError();
    }

    res.status(200).json({ token: generateToken(fetchedUser) });
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    }
  }
};

const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = 12; // Higher = more secure but slower
  return await bcrypt.hash(plainPassword, saltRounds);
};

const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
