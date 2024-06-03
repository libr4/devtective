import mongoose, { Document } from "mongoose";

interface Counter {
  fromProject:mongoose.Types.ObjectId,
  seq: Number
}

const TaskCounterSchema = new mongoose.Schema({
  fromProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

export default mongoose.model<Counter>('Counter', TaskCounterSchema);