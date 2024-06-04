import { Request } from "express";
import { Document } from "mongoose";

export interface IProject extends Document {
    _id:mongoose.Types.ObjectId,
    name: string;
    description: string;
    status: string;
    members:mongoose.Types.ObjectId[];
    url: string;
    // owner: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    leader:mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

export interface ProjectRequest extends Request {
    project?:IProject
}