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
            req.body.role = "Admin";
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const user = await User.create(req.body)
        // return res.status(StatusCodes.CREATED).json({message:"Usuário criado!"});
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


/**Atualiza informações do usuário
 * espera o id do usuario no corpo da request
 * assim como as informações para mudança
 * 
 */
export const updateUser = async (req:UserRequest, res:Response) => {
    const newUser = req.body;
    console.log("UPDATE USER REQ USER", req.user)
    const updatedUser = await UserModel.findByIdAndUpdate(req.user?._id, newUser, {new:true})
    console.log("USUARIO ATALIZADO", updatedUser)
    return res.status(StatusCodes.OK).json(updatedUser)
}

// const getTask = async (req:TaskRequest, res:Response) => {
//     const task = req.task;
//     return res.status(StatusCodes.OK).json(task);
// }

// const updateTask = async (req:TaskRequest, res:Response) => {
//     const taskChanges = req.body;
//     try {
//         const task = req.task as ITask;
//         const taskId = task.taskId;
//         console.log("task:", task);
//         let updatedTask:ITask = await Task.findOneAndUpdate({taskId}, taskChanges, {new:true}) as ITask;
//         if (!updatedTask) throw new NotFoundError(['Tarefa não encontrada!']);
//         return res.status(StatusCodes.OK).json({source:"updateTask", updatedTask});
//     } catch (error) {
//         return handleError(res, error);
//         // console.log(error);
//         // return res.status(StatusCodes.NOT_FOUND).json({msg:"Erro ao atualizar tarefa"})
//     }
// }

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