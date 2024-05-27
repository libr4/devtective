import mongoose from 'mongoose';

export interface IProject {
  name: string;
  description: string;
  status: string;
  members:mongoose.Types.ObjectId[];
  url: string;
  owner: mongoose.Types.ObjectId;
  leader:mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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
  owner:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  leader:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdAt: Date,
  updatedAt: Date,   
},
  {timestamps:true}
)

export default mongoose.model<IProject>("Project", ProjectSchema);