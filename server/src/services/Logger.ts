import { type Request, type Response, type NextFunction } from "express";

export default function Logger(req: Request, _:Response, next: NextFunction) {
  console.log(req.url);
  next();
}
