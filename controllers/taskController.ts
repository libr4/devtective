import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task, { ITask } from '../models/TaskModel.js'
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import { UserRequest } from '../types/user.js';
import { ProjectRequest } from '../types/project.js';
import TaskService from '../service/TaskService.js';

/**Retorna todas as tarefas referentes a um projeto, desde que o usuário esteja logado */
const getAllTasks = async (req:ProjectRequest, res:Response) => {
    try {
        // Se o projeto não estivesse presente, esse código não chegaria a ser executado
        const projectId = req.project?._id;
        const query = req.query;
        query.fromProject = projectId;
        const allTasks = await Task.find(query);
        return res.status(StatusCodes.OK).json(allTasks)
    } catch (error) {
        handleError(res, error);
    }
}

const createTask = async (req:ProjectRequest, res:Response) => {
    try {
        const fromProject = req.project?._id;
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
    const taskChangesArray = req.body.changes;
    try {
        const task = req.task as ITask;
        const taskId = task.taskId;

        const fromProject = req.project?._id;
        const fromTask = req.task?._id;
        console.log('task:', task, 'project:', req.project)

        let updatedTask = await TaskService.updateTask({fromProject, taskId}, taskChangesArray)
        if (!updatedTask) throw new NotFoundError(['Tarefa não encontrada!']);

        let createdTaskActivity = await TaskService.createTaskActivity({...req.body, fromProject, fromTask})
        if (!createdTaskActivity) throw new NotFoundError(['Erro ao criar movimentação!']);

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


export const deleteManyTasks = async (req:TaskRequest, res:Response) => {
    try {
        const taskIdsToDelete = req.body;
        const fromProject = req.project?._id;
        const deletedTasks = await Task.deleteMany({taskId:taskIdsToDelete, fromProject})
        return res.status(200).json(deletedTasks);
    } catch (error) {
        handleError(res, error);
    }
}

export {getAllTasks, getTask, createTask, updateTask, deleteTask}