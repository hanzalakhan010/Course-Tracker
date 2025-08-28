import { Router } from "express";
import { getAllCourses } from "../services/Courses.js";

export const CourseRouter = Router();

CourseRouter.route("/").get(getAllCourses).post;
