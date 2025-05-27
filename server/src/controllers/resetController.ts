import { Request, Response } from "express";
import * as resetService from "../services/resetService";

export const resetApi = (req: Request, res: Response) => {
  resetService.resetStores();
  res.status(200).json({ message: "System reset successful" });
};
