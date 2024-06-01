import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectId, Types } from 'mongoose';

export const comparePassword = async (password:string, hashedPassword:string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

interface Payload {
    _id:Types.ObjectId,
    role:string
}
export const createJWT = (payload:Payload) => {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret, {
        expiresIn:'1d'
    })
    return token;
}

export const verifyJWT = (token:string) => {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    return user;
}

