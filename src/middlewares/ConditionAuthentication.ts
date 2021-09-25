import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HEADERS } from "../constants";
import { generateToken } from "../helpers";

const SECRET = process.env.SECRET!;

export function conditionalAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers[HEADERS.AUTH] as string;

  if (!authHeader) {
    return next();
  }

  // Bearer aab9c9df0g7e173499d7f891d918a912bd2f
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return next();
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return next();
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return next();
    }

    const token = generateToken({ id: decoded!.id }, { expiresIn: "30d" });

    req._id = decoded!.id;
    res.setHeader(HEADERS.AUTH, token);
    return next();
  });
}
