import jwt from "jsonwebtoken";

import { type Request, type Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
export async function loginService(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    // 2. Compare plain password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).send({ error: "Server error" });
  }
}
