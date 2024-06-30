import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task, { ITask } from '../models/TaskModel.js'
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import { UserRequest } from '../types/user.js';
import { IProject, ProjectRequest } from '../types/project.js';
import TaskActivityModel from '../models/TaskActivityModel.js';
import mongoose, { ObjectId } from 'mongoose';
import TaskModel from '../models/TaskModel.js';
import { ITaskUpdate } from '../types/taskActivity.js';
import TaskService from '../service/TaskService.js';

interface TaskActivityRequest extends Request {
    _id?:mongoose.Types.ObjectId
    task:ITask
    project:IProject
}

export const getAllTaskUpdates = async (req:TaskRequest, res:Response) => {
    try {
        const fromProject = req.project?._id;
        const fromTask = req.task?._id;
        const query = {fromProject, fromTask} as ITaskUpdate;
        const allTaskUpdates = await TaskService.getAllActivities(query);
        console.log(allTaskUpdates)
        return res.status(StatusCodes.OK).json(allTaskUpdates)
    } catch (error) {
        handleError(res, error);
    }
}

export const createTaskActivity = async (req:TaskRequest, res:Response) => {
    try {
        const fromProject = req.project?._id || req.body.project;
        
        const taskId:Number | undefined = req.task?.taskId; //id da task em relação ao projeto
        const task_id:ObjectId | undefined = req.task?._id as unknown as ObjectId; //id geral da task

        const changesArray:ITaskUpdate['changes'] = req.body.changes;

        const changesInTask: Partial<ITask> = changesArray.reduce((acc, change) => {
            acc[change.field] = change.newValue;
            return acc;
        }, {} as Partial<ITask>);
        console.log(changesInTask)

        const taskUpdate:ITask | null = await TaskModel.findOneAndUpdate({fromProject, taskId,}, changesInTask, {new:true})
        if (!taskUpdate) throw new Error('Tarefa não atualizada')
        console.log(taskUpdate)
        const taskActivity:ITaskUpdate | null = await TaskActivityModel.create<ITaskUpdate>({...req.body, fromProject, fromTask:task_id}) as unknown as ITaskUpdate
        if (!taskUpdate) throw new Error('Tarefa não foi criada')
        console.log(taskActivity)
        return res.status(StatusCodes.CREATED).json(taskActivity);
    } catch (error) {
        handleError(res, error);
    }
}

export const deleteTaskActivity = async (req:TaskActivityRequest, res:Response) => {
    try {
        const fromProject = req.project?._id;
        const fromTask = req.task?._id;
        const removedTaskActivity = await TaskActivityModel.findOneAndDelete({fromProject, fromTask, _id:req.params._id}) as ITaskUpdate;
        if(!removedTaskActivity) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json({removedTaskActivity})
    } catch (error) {
        handleError(res, error);
    }
}

// const updateTaskActivity = async (req:TaskRequest, res:Response) => {
//     const taskChanges = req.body;
//     try {
//         const task = req.task as ITask;
//         const taskId = task.taskId;
//         const fromProject = req.project?._id;
//         let updatedTask:ITask = await Task.findOneAndUpdate({fromProject, taskId}, taskChanges, {new:true}) as ITask;
//         if (!updatedTask) throw new NotFoundError(['Tarefa não encontrada!']);
//         return res.status(StatusCodes.OK).json(updatedTask);
//     } catch (error:any) {
//         return handleError(res, error);
//     }
// }

// export const deleteManyTasks = async (req:TaskRequest, res:Response) => {
//     try {
//         const taskIdsToDelete = req.body;
//         const fromProject = req.project?._id;
//         const deletedTasks = await Task.deleteMany({taskId:taskIdsToDelete, fromProject})
//         return res.status(200).json(deletedTasks);
//     } catch (error) {
//         handleError(res, error);
//     }
// }

// export {getAllTasks, getTask, createTask, updateTask, deleteTask}