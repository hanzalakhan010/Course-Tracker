import { Router } from "express";
import { addCourse, getAllCourses, getCourseById } from "../services/Courses.js";

export const CourseRouter = Router();

CourseRouter.route("/").get(getAllCourses).post(addCourse);

CourseRouter.route("/:id").get(getCourseById);

