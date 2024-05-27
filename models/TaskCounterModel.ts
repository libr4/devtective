import mongoose, { Document } from "mongoose";

interface Counter {
  _id:String,
  seq: Number
}

const counterSchema = new mongoose.Schema<Counter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

export default mongoose.model<Counter>('Counter', counterSchema);