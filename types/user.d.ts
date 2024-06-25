import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
    _id:mongoose.Types.ObjectId,
    username: string,
    email: string,
    password?: string, // Hashed password
    role: USER_ROLES, // e.g., "admin", "developer", "manager"
    name: string,
    lastName: string,
    // profilePictureUrl: String, // URL to the user's profile picture
    status: string, // e.g., "active", "inactive", "banned"
    lastLogin: Date, // Last login timestamp
    createdAt: Date,
    updatedAt: Date,
    // preferences: {
    // notifications: Boolean, // Whether the user wants notifications
    // language: String // User's preferred language
    // }
}

export interface UserRequest extends Request {
    cookies?: { token: string; };
    user?: IUser
}