import mongoose, { type Document, Schema } from "mongoose";

interface IResource extends Document {
  title: string;
  url: string; // or path in cloud storage
  course: mongoose.Types.ObjectId;
}

const ResourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
});

export const Resource = mongoose.model<IResource>("Resource", ResourceSchema);
