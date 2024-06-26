import mongoose from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';
import { IUser } from '../types/user.js';

const UserSchema = new mongoose.Schema<IUser>({
    
    username: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    }, // Hashed password
    role: {
        type:String,
        enum:USER_ROLES,
        default:USER_ROLES.Not_Specified
    }, // e.g., "admin", "developer", "manager"
    name: {
        type:String,
    },
    lastName: String,
    // profilePictureUrl: String, // URL to the user's profile picture
    status: String, // e.g., "active", "inactive", "banned"
    lastLogin: Date, // Last login timestamp
    createdAt: Date,
    updatedAt: Date,
    // preferences: {
    // notifications: Boolean, // Whether the user wants notifications
    // language: String // User's preferred language
    // }    
    },
    {timestamps:true}
)

export default mongoose.model<IUser>("User", UserSchema);