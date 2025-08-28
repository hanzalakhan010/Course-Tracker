import cors from "cors";
import express from "express";
import { AuthRouter } from "./routes/Auth.js";
import Logger from "./services/Logger.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./models/db.js";
import { UserRouter } from "./routes/User.js";
import { CourseRouter } from "./routes/courses.js";
import { AuthMiddleware } from "./middlewares/Auth.js";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(Logger);
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

// Protected Routes

app.use(AuthMiddleware);

app.use("/api/courses", CourseRouter);

connectDB();
app.listen(3000, () => {
  console.log("Listenig on port 3000");
});
