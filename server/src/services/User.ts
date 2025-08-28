import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { type Request, type Response } from "express";

export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req?.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ success: true, email: user.email });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
