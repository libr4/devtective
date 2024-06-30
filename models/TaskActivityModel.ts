import mongoose, { Types } from "mongoose";
import { ITaskUpdate } from "../types/taskActivity";

const TaskActivitySchema = new mongoose.Schema({
  fromTask: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  fromProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  note: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  changes: [{
    field: { type: String, required: true },
    oldValue: { type: mongoose.Schema.Types.Mixed },
    newValue: { type: mongoose.Schema.Types.Mixed },
  }],
},
{ timestamps: true });

export default mongoose.model<ITaskUpdate>('TaskUpdate', TaskActivitySchema);