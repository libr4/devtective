import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task, { ITask } from '../models/TaskModel.js'
import User from '../models/UserModel.js';
import { IUser, UserRequest } from '../types/user.js';
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel.js';
import { USER_ROLES } from '../utils/constants.js';


const getAllUsers= async (req:Request, res:Response) => {
    try {
        const allUsers = await User.find({});
        return res.status(StatusCodes.OK).json(allUsers);
    } catch (error) {
        handleError(res, error);
    }
}

 
const createUser = async (req:Request, res:Response) => {
    try {
        const isFirstUser = await User.countDocuments() === 0;
        if (isFirstUser) {
            req.body.role = USER_ROLES.Admin;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = await User.create(req.body)
        return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        handleError(res, error);
    }
}

export const getCurrentUser = async (req:UserRequest, res:Response) => {
    const user = await User.findById(req.user?._id) as IUser;
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(StatusCodes.OK).json(userObj)
}


/**Atualiza informações do usuário.
 * Espera o id do usuario no corpo da request
 * assim como as informações para mudança
 */
export const updateUser = async (req:UserRequest, res:Response) => {
    const newUser = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(req.user?._id, newUser, {new:true})
    return res.status(StatusCodes.OK).json(updatedUser)
}

const deleteUser = async (req:UserRequest, res:Response) => {
    try {
        const userId = req.params.userId;
        const removedUser = await Task.findByIdAndDelete(userId) as IUser;
        if(!removedUser) {
            throw new NotFoundError(['Usuário não encontrado!']);
        }
        return res.status(StatusCodes.OK).json({removedUser, msg:"Usuário deletado com sucesso"})
        
    } catch (error) {
        handleError(res, error);
    }
}

export {getAllUsers, createUser, deleteUser}