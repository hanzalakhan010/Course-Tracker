import jwt from "json-web-token";

import { type Request, type Response} from "express";

export function loginService(req: Request, res: Response) {
  const { email, password } = req?.body;
  console.log(req.body);
  if (email == "hanzala@h.com" && password == "111") {
    const token = jwt.encode;
    return res.json({
      user_id: 1,
      token: "fake-jwt-token",
      message: "Login successful",
    });
  }
  res.status(401).send("Login Failed");
}
