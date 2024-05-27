import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Task from '../models/TaskModel.js';
import User from '../models/UserModel.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(StatusCodes.OK).json(allUsers);
    }
    catch (error) {
        handleError(res, error);
    }
};
const createUser = async (req, res) => {
    try {
        const isFirstUser = await User.countDocuments() === 0;
        if (isFirstUser) {
            req.body.role = "Admin";
        }
        const user = await User.create(req.body);
        return res.status(StatusCodes.CREATED).json(user);
    }
    catch (error) {
        handleError(res, error);
    }
};
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
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const removedUser = await Task.findByIdAndDelete(id);
        if (!removedUser) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json({ removedUser, msg: "Usuário deletado com sucesso" });
    }
    catch (error) {
        handleError(res, error);
        // console.log(error);
        // return res.status(500).json({msg:"Erro ao deletar tarefa", error})
    }
};
export { getAllUsers, createUser, deleteUser };
