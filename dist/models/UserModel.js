import mongoose from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String, // Hashed password
    role: {
        type: String,
        enum: USER_ROLES,
        default: USER_ROLES.Not_Specified
    }, // e.g., "admin", "developer", "manager"
    firstName: String,
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
}, { timestamps: true });
export default mongoose.model("User", UserSchema);
