import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task, { ITask } from '../models/TaskModel.js'
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import { UserRequest } from '../types/user.js';
import { ProjectRequest } from '../types/project.js';

const getAllTasks = async (req:ProjectRequest, res:Response) => {
    try {
        // const projectId = req.params.projectId;
        const projectId = req.project?._id;
        console.log("projectId", projectId);
        const allTasks = await Task.find({fromProject:projectId});
        return res.status(StatusCodes.OK).json(allTasks)
    } catch (error) {
        handleError(res, error);
    }
}

const createTask = async (req:UserRequest, res:Response) => {
    console.log(req.user);
    try {
        const fromProject = req.params.projectId;
        console.log("projectId", fromProject)
        if (!req.body.fromProject) {
            req.body.fromProject = fromProject;
        }
        console.log("req.body.fromProject", req.body.fromProject);
        const task = await Task.create(req.body)
        return res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"some kind of error"})
    }
}

const getTask = async (req:TaskRequest, res:Response) => {
    console.log(req.params)
    const task = req.task;
    return res.status(StatusCodes.OK).json(task);
}


const updateTask = async (req:TaskRequest, res:Response) => {
    const taskChanges = req.body;
    try {
        const task = req.task as ITask;
        const taskId = task.taskId;
        const fromProject = req.project?._id;
        console.log("task:", task);
        let updatedTask:ITask = await Task.findOneAndUpdate({fromProject, taskId}, taskChanges, {new:true}) as ITask;
        if (!updatedTask) throw new NotFoundError(['Tarefa não encontrada!']);
        return res.status(StatusCodes.OK).json(updatedTask);
    } catch (error:any) {
        return handleError(res, error);
    }
}

const deleteTask = async (req:TaskRequest, res:Response) => {
    try {
        console.log("params", req.params.taskId);
        const removedTask = await Task.findOneAndDelete({taskId:req.params.taskId}) as ITask;
        if(!removedTask) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json({removedTask, msg:"Tarefa deletada com sucesso"})
        
    } catch (error) {
        handleError(res, error);
        // console.log(error);
        // return res.status(500).json({msg:"Erro ao deletar tarefa", error})
    }
}

export {getAllTasks, getTask, createTask, updateTask, deleteTask}