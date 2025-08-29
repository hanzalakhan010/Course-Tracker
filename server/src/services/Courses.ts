import { type Request, type Response } from "express";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { Resource } from "../models/Resource.js";
import { Lecture } from "../models/Lecture.js";
export async function getAllCourses(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user.id }).populate({
    path: "courses",
    populate: ["resources", "lectures"],
  });
  res.send(user?.courses);
}

export async function addCourse(req: Request, res: Response) {
  try {
    const { title, code } = req.body;
    console.log(title, code);

    // Create new course
    const newCourse = await Course.create({
      title,
      code,
      createdBy: req.user.id,
    });

    // Push course id into user's courses
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add course" });
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Basic validation
    if (!id) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find course by id, optionally populate if you want user/lectures/resources
    const course = await Course.findById(id)
      .populate("createdBy", "name email") // if you track creator
      .populate("lectures") // if you have Lecture model
      .populate("resources"); // if you have Resource model

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
