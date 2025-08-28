import { Router, type Request, type Response } from "express";
import { signUp } from "../services/User.js";

export const UserRouter = Router();

UserRouter.post("/signup", signUp);
