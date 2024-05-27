import { NextFunction, Request, Response } from "express";
import {ValidationChain, body, validationResult} from 'express-validator';
import Task, { ITask } from "../models/TaskModel.js";
import { BadRequestError, NotFoundError, ValidationError } from "../errors/customErrors.js";
import { TASK_PRIORITIES, TASK_STATUS, TASK_TYPES } from "../utils/constants.js";
import { StatusCodes } from "http-status-codes";
import { handleError } from "./errorHandlerMiddleware.js";
import UserModel from "../models/UserModel.js";

const MAX_DESCRIPTION:number = 3000;
const MAX_TITLE:number = 100;

const handleValidationErrors = (validationRules:ValidationChain[]) => {
    return [
        ...validationRules,
        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json(errors);
            }
            next();
        }
    ]
}

const MAX_USERNAME = 32;
const MIN_USERNAME = 8;
const MIN_PASSWORD = 8;
export const validateRegisterInput = handleValidationErrors([
    body('username').notEmpty().withMessage('username é um campo obrigatório')
        .isLength({min:MIN_USERNAME, max:MAX_USERNAME}).withMessage(`O campo username deve ter entre ${MIN_USERNAME} e ${MAX_USERNAME} caracteres!`),
    body('email').notEmpty().withMessage('email é um campo obrigatório')
        .isEmail().withMessage('Email inválido!')
        .custom(async (email) => {
            const user = await UserModel.findOne({email});
            if (user) {
                throw new ValidationError(["O email já existe!"])
            }
        }),
    body('password')
        .notEmpty().withMessage('password é obrigatório')
        .isLength({min:MIN_PASSWORD}).withMessage(`O password deve ter no mínimo ${MIN_PASSWORD} caracteres`)
])