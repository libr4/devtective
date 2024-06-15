import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task, { ITask } from '../models/TaskModel.js'
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import { UserRequest } from '../types/user.js';
import { ProjectRequest } from '../types/project.js';

/**Retorna todas as tarefas referentes a um projeto, desde que o usuário esteja logado */
const getAllTasks = async (req:ProjectRequest, res:Response) => {
    try {
        // Se o projeto não estivesse presente, esse código não chegaria a ser executado
        const projectId = req.project?._id;
        const allTasks = await Task.find({fromProject:projectId});
        return res.status(StatusCodes.OK).json(allTasks)
    } catch (error) {
        handleError(res, error);
    }
}

const createTask = async (req:ProjectRequest, res:Response) => {
    try {
        const fromProject = req.project?._id;
        console.log('fromProejct', fromProject)
        console.log('reqbodyfromproject', req.body.fromProject)
        //se o projeto não for especificado, cadastra o projeto da url
        if (!req.body.fromProject) {
            req.body.fromProject = fromProject;
        }
        const task = await Task.create(req.body)
        return res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
        handleError(res, error);
    }
}

const getTask = async (req:TaskRequest, res:Response) => {
    const task = req.task;
    return res.status(StatusCodes.OK).json(task);
}


const updateTask = async (req:TaskRequest, res:Response) => {
    const taskChanges = req.body;
    try {
        const task = req.task as ITask;
        const taskId = task.taskId;
        const fromProject = req.project?._id;
        let updatedTask:ITask = await Task.findOneAndUpdate({fromProject, taskId}, taskChanges, {new:true}) as ITask;
        if (!updatedTask) throw new NotFoundError(['Tarefa não encontrada!']);
        return res.status(StatusCodes.OK).json(updatedTask);
    } catch (error:any) {
        return handleError(res, error);
    }
}

const deleteTask = async (req:TaskRequest, res:Response) => {
    try {
        const fromProject = req.project?._id;
        const removedTask = await Task.findOneAndDelete({fromProject, taskId:req.params.taskId}) as ITask;
        if(!removedTask) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json({removedTask, msg:"Tarefa deletada com sucesso"})
        
    } catch (error) {
        handleError(res, error);
    }
}

export {getAllTasks, getTask, createTask, updateTask, deleteTask}