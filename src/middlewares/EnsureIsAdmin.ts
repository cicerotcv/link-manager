import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export async function ensureIsAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id } = req;

    const user = await User.findOne({ _id }).select("+isAdmin");

    if (!user?.isAdmin) {
      return res.status(403).json({ error: "You are not an administrator" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
