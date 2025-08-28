import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Load your secret key (RSA or HMAC). Here we use a file as you wanted

const keyPath = path.join(process.cwd(), "key.jwt");

const secret = fs.readFileSync(keyPath, "utf-8");

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.token; // cookie-parser must be used in app.ts
    if (!token) {
      return res.status(401).json({ error: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = decoded; // attach to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
