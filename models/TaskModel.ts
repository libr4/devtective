import mongoose, { Document } from 'mongoose';
import TaskCounter from './TaskCounterModel.js';
import { nanoid } from 'nanoid';
import { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } from '../utils/constants.js';

// type StatusType = "Open" | "In progress" | "Completed" 


export interface ITask extends Document {
  _id:mongoose.Types.ObjectId,
  taskId: Number;
  title: string;
  description: string;
  status: TASK_STATUS; // e.g., "open", "in progress", "completed"
  priority:TASK_PRIORITIES;
  type:TASK_TYPES;
  fromProject:mongoose.Types.ObjectId;
  technology:string;
  assignedTo: mongoose.Types.ObjectId; // Reference to the User
  createdBy: mongoose.Types.ObjectId; // Reference to the User
  createdAt: Date;
  updatedAt: Date;
  deadline: string;
}

const TaskSchema = new mongoose.Schema<ITask>({
  
  taskId: {type: Number, unique:true},
  title: {
    type:String,
    required:true,
  },
  description: String,
  status: { 
    type: String, 
    enum: TASK_STATUS, // Enforce enum values
    default: TASK_STATUS.Open 
  },
  priority: { 
    type: String, 
    enum: TASK_PRIORITIES, // Enforce enum values
    default: TASK_PRIORITIES.Medium 
  },
  technology: {
    type:String,
    default:"",
  },
  deadline: {
    type:String,
    // default:"",
  },
  type: {
    type:String,
    enum: TASK_TYPES,
    required: true
  },
  fromProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Project",
    // unique:true,
  },
  assignedTo: {
    type:mongoose.Schema.Types.ObjectId, // Refrence to the User
    ref:"User",
  },
  createdBy: {
    type:mongoose.Schema.Types.ObjectId, // Refrence to the User
    ref:"User",
    // required:true,
  },
},
  {timestamps:true}
)

TaskSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const counter = await TaskCounter.findOneAndUpdate(
        { fromProject: this.fromProject },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      this.taskId = counter.seq;
      next();
    } catch (error:any) {
      next(error);
    }
  } else {
    next();
  }
});


export default mongoose.model<ITask>("Task", TaskSchema);