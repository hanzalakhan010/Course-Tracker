import mongoose, { Schema, Document } from "mongoose";
interface ILecture extends Document {
  title: string;
  date: Date;
  course: mongoose.Types.ObjectId;
}

const LectureSchema = new Schema<ILecture>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
});

export const Lecture = mongoose.model<ILecture>("Lecture", LectureSchema);
