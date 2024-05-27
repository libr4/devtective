import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task from '../models/TaskModel.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import ProjectModel from '../models/ProjectModel.js';
const getAllProjects = async (req, res) => {
    try {
        const allProjects = await ProjectModel.find({});
        return res.status(StatusCodes.OK).json(allProjects);
    }
    catch (error) {
        handleError(res, error);
    }
};
const createProject = async (req, res) => {
    try {
        const project = await ProjectModel.create(req.body);
        return res.status(StatusCodes.CREATED).json(project);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "some kind of error" });
    }
};
const getTask = async (req, res) => {
    const task = req.task;
    return res.status(StatusCodes.OK).json(task);
};
const updateTask = async (req, res) => {
    const taskChanges = req.body;
    try {
        const task = req.task;
        const taskId = task.taskId;
        console.log("task:", task);
        let updatedTask = await Task.findOneAndUpdate({ taskId }, taskChanges, { new: true });
        if (!updatedTask)
            throw new NotFoundError(['Tarefa não encontrada!']);
        return res.status(StatusCodes.OK).json({ source: "updateTask", updatedTask });
    }
    catch (error) {
        return handleError(res, error);
        // console.log(error);
        // return res.status(StatusCodes.NOT_FOUND).json({msg:"Erro ao atualizar tarefa"})
    }
};
const deleteTask = async (req, res) => {
    try {
        console.log("params", req.params.taskId);
        const removedTask = await Task.findOneAndDelete({ taskId: req.params.taskId });
        if (!removedTask) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json({ removedTask, msg: "Tarefa deletada com sucesso" });
    }
    catch (error) {
        handleError(res, error);
        // console.log(error);
        // return res.status(500).json({msg:"Erro ao deletar tarefa", error})
    }
};
export { getAllProjects, getTask, createProject, updateTask, deleteTask };
