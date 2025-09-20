import mongoose, { type Document, Schema } from "mongoose";

interface ICourse extends Document {
  title: string;
  code: string;
  createdBy: mongoose.Types.ObjectId;
  resources: mongoose.Types.ObjectId[];
  lectures: mongoose.Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
  lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
});

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
