import mongoose, { type Document, Schema } from "mongoose";

interface ICourse extends Document {
  name: string;
  code: string;
  resources: mongoose.Types.ObjectId[];
  lectures: mongoose.Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
  lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
});

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
