import { Document } from "mongoose";
import { ITask } from "../models/TaskModel";

export interface ITaskUpdate extends Document{
    fromTask: ObjectId;
    fromProject: ObjectId;
    note?: string;
    author: ObjectId;
    changes: Array<{
      field: keyof ITask;
      oldValue: any;
      newValue: any;
    }>;
}