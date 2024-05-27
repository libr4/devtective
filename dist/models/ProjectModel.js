import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: String,
    status: {
        type: String,
        default: "created"
    },
    members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    url: String,
    owner: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    leader: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });
export default mongoose.model("Project", ProjectSchema);
