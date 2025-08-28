import { type Request, type Response } from "express";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";

export async function getAllCourses(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user.id }).populate({
    path: "courses",
    populate: ["resources", "lectures"],
  });
  res.send(user?.courses);
}
