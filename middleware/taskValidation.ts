import { NextFunction, Request, Response } from "express";
import {body} from 'express-validator';
import Task, { ITask } from "../models/TaskModel.js";
import { BadRequestError, NotFoundError, ValidationError } from "../errors/customErrors.js";
import { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } from "../utils/constants.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "./errorHandlerMiddleware.js";
import { IProject } from "../types/project.js";

const MAX_DESCRIPTION:number = 3000;
const MAX_TITLE:number = 100;

export const validateRequired = (field:string, fieldName:string) => {
    if(!field) {
        return `O campo ${fieldName} é obrigatório!`
    }
    return ''
}

export const checkValidValue = <T>(field:T, fieldName:string, VALID_TYPES:any):string => {
    if (!Object.values(VALID_TYPES).includes(field)) {
        return `${field} é um valor inválido para ${fieldName}!`
    }
    return '';
}

export const checkSize = (field:string, fieldName:string, MIN_SIZE?:number, MAX_SIZE?:number):string => {

        if(MIN_SIZE && MAX_SIZE && field.length < MIN_SIZE) {
            return `O campo ${fieldName} deve ter entre ${MIN_SIZE} e ${MAX_SIZE} caracteres`
        }

        if(MIN_SIZE && field.length < MIN_SIZE) {
            return `O campo ${fieldName} deve ter no mínimo ${MIN_SIZE} caracteres`
        }

        if (MAX_SIZE && field.length > MAX_SIZE) {
            return `O campo ${fieldName} excedeu o tamanho máximo de ${MAX_SIZE} caracteres`
        }
        return '';
}

const checkType = (field:string, fieldName:string, stringType:string) => {
        if (typeof(field) !== stringType) {
            return "Tipo de titulo inválido"
        }
        return '';
}

const validateTitle = (title:string) => {
        const fieldName = "Título";
        const error = validateRequired(title, fieldName);
        if(error) return error;
        
        checkType(title, fieldName, "string");

        const sizeError = checkSize(title, fieldName, 10, MAX_TITLE);
        if(sizeError) return sizeError;

        return ''
}

const validateDescription = (description:string) => {
    const error = validateRequired(description, "descrição");
    if(error) return error;
    if (!description) {
        return "A tarefa precisa conter alguma descrição!"
    }
    const sizeError = checkSize(description, "Descrição", 10, MAX_DESCRIPTION);
    if(sizeError) return sizeError;
    return ''
}

const validateType = (type : TASK_TYPES) => {
        const requiredError = validateRequired(type, "tipo");
        if(requiredError) return requiredError;

        if (!type) return ('O tipo da tarefa é obrigatório!');
         
        const correctTypeError = checkValidValue(type, "Tipo da Tarefa", TASK_TYPES);
        if(correctTypeError) return correctTypeError;

        return ''
}
const validatePriority = (priority:string):string => {
    if(priority) {
        const correctTypeError = checkValidValue(priority, "Prioridade", TASK_PRIORITIES);
        if(correctTypeError) return correctTypeError;
    }
    return ''
}

const validateStatus = (status:string):string => {
    if(status) {
        const correctTypeError = checkValidValue(status, "Situação", TASK_STATUS);
        if(correctTypeError) return correctTypeError;
    }
    return ''
}
export const validateTaskData = (req:Request, res:Response, next:NextFunction) => {
        const { title, description, type, priority, status } = req.body;

       //novas validações podem ser colocadas nessa lista, caso surjam
       const errors = [

        validateTitle(title),

        validateDescription(description),

        validateType(type),

        validatePriority(priority),

        validateStatus(status),

       ].filter((msg) => msg.length > 0);
        
        if (errors.length > 0) {
            const validationError = new ValidationError(errors);
            return handleError(res, validationError);
            // return res.status(validationError.statusCode).json({error:validationError.messages});
        }

        next();
}

export interface TaskRequest extends Request {
    project?: IProject;
    task?: ITask;
}

/** verifica se o id da tarefa está presente e se é um id de tarefa existente.
Por fim, inclui a task na request para possível manipulação nos próximos middleware
ou controladores */
export const validateTaskIdParam = async (req:TaskRequest, res:Response, next:NextFunction) => {
    const {taskId} = req.params;
    try {
        const projectId = req.project?._id;
        if(!projectId) {
            throw new ValidationError(["Erro ao encontrar tarefa!"])
        }
        if (!taskId) throw new ValidationError(['O id da tarefa é obrigatório!']);
        let task =  await Task.findOne({taskId, fromProject:projectId});
        if(!task) {
            throw new ValidationError(["Erro ao encontrar tarefa!"])
        }
        req.task = task
    } catch (error:any) {
        return handleError(res, error);
    }
    return next();
}

/**For the task activity api, it is used the mongoose object id (the _id property) for task identification.
 * 
 */
export const validateTaskIdParamForTaskActivity = async (req:TaskRequest, res:Response, next:NextFunction) => {

    const {task_id} = req.params;
    try {
        const projectId = req.project?._id;
        if(!projectId) {
            throw new ValidationError(["Erro ao encontrar projeto!"])
        }
        if (!task_id) throw new ValidationError(['O id da tarefa é obrigatório!']);
        let task =  await Task.findOne({_id:task_id, fromProject:projectId});
        if(!task) {
            throw new ValidationError(["Erro ao encontrar tarefa!"])
        }
        req.task = task
    } catch (error:any) {
        return handleError(res, error);
    }
    return next();
}
