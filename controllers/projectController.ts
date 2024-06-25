import {Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import { TaskRequest } from '../middleware/taskValidation.js';
import { handleError } from '../middleware/errorHandlerMiddleware.js';
import ProjectModel from '../models/ProjectModel.js';
import { UserRequest } from '../types/user.js';
import { ProjectRequest, IProject } from '../types/project.js';
import mongoose from 'mongoose';

const projectWithMemberNamesQuery = (userId:string) => [
    {
        $match: {
            members: new mongoose.Types.ObjectId(userId) // filter projects where the given user is a member
        }
    },
    {
        $lookup: {
        from: 'users', // the collection name for User model
        localField: 'members', // field in the Project collection
        foreignField: '_id', // field in the User collection
        as: 'memberDetails' // output array field
        }
    },
    {
        $project: {
            name: 1,
            description: 1,
            status: 1,
            members: 1,
            createdBy: 1,
            leader: 1,
            createdAt: 1,
            updatedAt: 1,
            memberDetails: {
                _id: 1,
                name: 1
            }
        }
    }
]
//Pega todos os projetos em que o solicitante está associado
const getAllProjects = async (req:UserRequest, res:Response) => {
    try {
        const userId = req.user?._id as string;
        console.log("projectcontroller", req.user)
        // const allProjects = await ProjectModel.find({members:userId});

        const projectsWithMemberNames = await ProjectModel.aggregate(projectWithMemberNamesQuery(userId));
        return res.status(StatusCodes.OK).json(projectsWithMemberNames)
    } catch (error) {
        handleError(res, error);
    }
}

const createProject = async (req:UserRequest, res:Response) => {
    try {
        const userId = req.user?._id as string;
        req.body.createdBy = userId;
        if (!req.body.members.includes(userId))
            req.body.members = [userId, ...req.body.members];
        const project = await ProjectModel.create(req.body);
        return res.status(StatusCodes.CREATED).json(project);
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"some kind of error"})
    }
}

// const getTask = async (req:TaskRequest, res:Response) => {
//     const task = req.task;
//     return res.status(StatusCodes.OK).json(task);
// }


const updateProject = async (req:ProjectRequest, res:Response) => {
    const projectChanges = req.body;
    try {
        const project = req.project as IProject;
        const projectId = req.params.projectId;
        console.log("project:", project);
        let updatedProject:IProject = await ProjectModel.findOneAndUpdate({_id:projectId}, projectChanges, {new:true}) as IProject;
        console.log("updatedProject", updatedProject)
        if (!updatedProject) throw new NotFoundError(['Projeto não encontrado!']);
        return res.status(StatusCodes.OK).json(updatedProject);
    } catch (error) {
        return handleError(res, error);
        // console.log(error);
        // return res.status(StatusCodes.NOT_FOUND).json({msg:"Erro ao atualizar tarefa"})
    }
}

const deleteProject = async (req:ProjectRequest, res:Response) => {
    try {
        console.log("params", req.params.projectId);
        const removedProject = await ProjectModel.findOneAndDelete({_id:req.params.projectId}) as IProject;
        if(!removedProject) {
            throw new NotFoundError(['Tarefa não encontrada!']);
        }
        return res.status(StatusCodes.OK).json(removedProject);
        
    } catch (error) {
        handleError(res, error);
        // console.log(error);
        // return res.status(500).json({msg:"Erro ao deletar tarefa", error})
    }
}

export {getAllProjects, createProject, updateProject, deleteProject}