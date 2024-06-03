import mongoose from 'mongoose';
import TaskCounter from './TaskCounterModel.js';
import { nanoid } from 'nanoid';
import { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } from '../utils/constants.js';

// type StatusType = "Open" | "In progress" | "Completed" 


export interface ITask extends Document {
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
}

const TaskSchema = new mongoose.Schema<ITask>({
  
  taskId: {type: Number, unique:true},
  title: String,
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
  type: {
    type:String,
    enum: TASK_TYPES,
    required: true
  },
  fromProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Project",
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
      const counter = await TaskCounter.findByIdAndUpdate(
        { _id: 'taskId' },
        // { fromProject: this.fromProject },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
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