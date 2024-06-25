import { NextFunction, Response } from "express";
import { ProjectRequest } from "../types/project";
import { handleValidationErrors } from "./validationMiddleware.js";
import { ValidationError } from "../errors/customErrors.js";
import ProjectModel from "../models/ProjectModel.js";
import { handleError } from "./errorHandlerMiddleware.js";
import { body, param } from "express-validator";
import mongoose from "mongoose";

/**Verifica se o id do projeto está presente na rota, se sim, procura o projeto no BD
 * e o coloca na requisição para o uso de próximos middleware ou controladores.
 * Caso haja algum problema com o id do projeto, retorna 'Projeto não identificado ou não existe'
 */
export const validateProjectIdParam = async (req:ProjectRequest, res:Response, next:NextFunction) => {
    const {projectId} = req.params;
    console.log("projectid: ", projectId)
    const validationError = new ValidationError(["Projeto não identificado ou não existe!"])
    try {
        let project =  await ProjectModel.findById(projectId);
        if(!project) {
            throw validationError;
        }
        req.project = project
    } catch (error:any) {
        return handleError(res, validationError);
    }
    return next();
}

const MAX_DESCRIPTION = 3000;
export const validateProjectInput = handleValidationErrors([
    // param('projectId')
    //     .notEmpty().withMessage('O projeto deve ser informado')
    //     .custom(async (projectId) => {
    //         const project = await ProjectModel.findById(projectId);
    //         if (!project) {
    //             console.log("projeto não encontrado")
    //             throw new Error('projeto não encontrado!!')
    //         }
    //         return project;
    //     }).withMessage("Projeto não encontrado"),
    body('name')
        .notEmpty().withMessage('O nome do projeto é obrigatório'),
    body('description')
        .isLength({max:MAX_DESCRIPTION}).withMessage(`A descrição deve ter no máximo ${MAX_DESCRIPTION} caracteres`),    
    body('members').isArray().withMessage('O campo membros deve ser uma lista'),
    //By now, it's possible that a project doesn't have a leader.
    // body('leader').notEmpty().withMessage('Informe ao menos um líder para o projeto!'),
])