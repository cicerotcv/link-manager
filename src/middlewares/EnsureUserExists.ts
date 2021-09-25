import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export async function ensureUserExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id } = req;

    const userExists = await User.findOne({ _id });

    if (!userExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
