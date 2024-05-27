import mongoose from 'mongoose';
import TaskCounter from './TaskCounterModel.js';
import { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } from '../utils/constants.js';
const TaskSchema = new mongoose.Schema({
    taskId: { type: Number, unique: true },
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
    type: {
        type: String,
        enum: TASK_TYPES,
        required: true
    },
    assignedTo: mongoose.Schema.ObjectId, // Refrence to the User
    createdBy: mongoose.Schema.ObjectId, // Refeence to the User
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });
TaskSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const counter = await TaskCounter.findByIdAndUpdate({ _id: 'taskId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.taskId = counter.seq;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next();
    }
});
export default mongoose.model("Task", TaskSchema);
