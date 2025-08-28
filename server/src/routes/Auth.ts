import { AuthMiddleware } from "../middlewares/Auth.js";
import { loginService } from "../services/Auth.js";
import { type Request, type Response } from "express";
import { Router } from "express";

export const AuthRouter = Router();

AuthRouter.post("/login", loginService);
AuthRouter.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", // same path as when set
  });
  return res.status(200).send({ success: true, message: "Logged out" });
});

AuthRouter.post("/me", AuthMiddleware, (req: Request, res) => {
  res.json({ user_email: req.user?.email });
});
