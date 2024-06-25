import {NextFunction, Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, UnauthenticatedError } from '../errors/customErrors.js';
import Task, { ITask } from '../models/TaskModel.js'
import User from '../models/UserModel.js';
import { IUser } from '../types/user.js';
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import bcrypt from 'bcryptjs'
import { comparePassword, createJWT } from '../utils/authUtils.js';
import { UserRequest } from '../types/user.js';

const login = async (req:UserRequest, res:Response) => {
    try {
        const user = await User.findOne({username:req.body.username});
        const isValidUser = user && await comparePassword(req.body.password, user.password as string);
        if (!isValidUser) {
            throw new UnauthenticatedError("Credenciais inválidas")
        }
        const _id = user._id;
        const token = createJWT({
            _id,
            role:user.role
        })
        const oneDay = 60 * 60 * 60 * 24;
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie('token', token, {
            httpOnly:true,
            expires:new Date(Date.now() + oneDay),
            secure:isProduction
        })
        return res.status(200).json({message:'user logged in'});
    } catch (error) {
        handleError(res, error);
    }
}

export const logout = (req:Request, res:Response, next:NextFunction) => {
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({message:'Usuário deslogado'})

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

const deleteUser = async (req:TaskRequest, res:Response) => {
    try {
        const id = req.params.id;
        const removedUser = await Task.findByIdAndDelete(id) as IUser;
        if(!removedUser) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json({removedUser, msg:"Usuário deletado com sucesso"})
        
    } catch (error) {
        handleError(res, error);
        // console.log(error);
        // return res.status(500).json({msg:"Erro ao deletar tarefa", error})
    }
}

export {login, deleteUser}