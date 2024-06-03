import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user";
import UserModel from "../models/UserModel.js";
import { ValidationError } from "../errors/customErrors.js";
import { handleError } from "./errorHandlerMiddleware.js";
import { USER_ROLES } from "../utils/constants";

export const validateUserIdParam = async (req:UserRequest, res:Response, next:NextFunction) => {
    const {userId} = req.params;
    const validationError = new ValidationError(["Usuário não identificado ou não encontrado!"])
    console.log("userId", userId)
    try {
        let user =  await UserModel.findById(userId);
        if(!user) {
            throw validationError;
        }
        req.user = user
    } catch (error:any) {
        return handleError(res, validationError);
    }
    return next();
}

export const validateUserChanges = async (req:UserRequest, res:Response, next:NextFunction) => {
    const changes = req.body;
    // const user = req.user;
    if (changes.role) {
        const validUserRoles = Object.values(USER_ROLES);
        if (!validUserRoles.includes(changes.role)) {
            return handleError(res, new ValidationError(["Valor inválido para permissão!"]))
        }
    }
    next();
}