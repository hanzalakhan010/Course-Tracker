import { type JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload | any; // if you attach user after verifying token
      body: any;
    }
  }
}
