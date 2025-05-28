import { Response, NextFunction, Request } from "express";
import { JWTPayload, Role } from "../types/auth";
import jwt from "jsonwebtoken";
import {
  AppError,
  ForbiddenError,
  NoTokenProvidedError,
  UnauthorizedError,
} from "../types/errors";
import { ErrorResponse, standardErrorMessage } from "../types/errors";

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response<void | ErrorResponse>,
  next: NextFunction
) => {
  try {
    // retrieve token from the header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new NoTokenProvidedError();
    }

    // decode and validate token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};

export const authorize =
  (requiredRole: Role) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new UnauthorizedError();
      }

      if (user.role !== requiredRole) {
        throw new ForbiddenError();
      }

      next();
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: standardErrorMessage });
      }
    }
  };
