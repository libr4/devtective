import mongoose from 'mongoose';
import { IProject } from '../types/project';

const ProjectSchema = new mongoose.Schema<IProject>({
  name:{
    required:true,
    type:String
  },
  description: String,
  status:{
    type:String,
    default:"created"
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  url: String,
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  leader:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  start:String,
  end:String,
  createdAt: Date,
  updatedAt: Date,   
},
  {timestamps:true}
)

export default mongoose.model<IProject>("Project", ProjectSchema);