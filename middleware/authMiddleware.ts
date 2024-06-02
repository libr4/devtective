import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { handleError } from "./errorHandlerMiddleware.js";
import { verifyJWT } from "../utils/authUtils.js";
// import { IUser } from "../models/UserModel.js";
import { IUser } from "../types/user.js";
import { UserRequest } from "../types/user.js";


/**Verifica se o token está presente na request e verifica se ele é válido */
export const authenticateUser = (req:UserRequest, res:Response, next:NextFunction) => {
    const unAuthError = new UnauthenticatedError("Autenticação inválida");
    if (!req.cookies?.token) {
        handleError(res, unAuthError);
    }
    const token = req.cookies?.token as string;
    try {
        const {_id, role} = verifyJWT(token) as IUser;
        req.user = {
            _id,
            role
        } as IUser;
        next();
    } catch (error) {
        handleError(res, unAuthError);
    }
    // next();
}

export const authorizeAccess = (...roles:string[]) => {
    return (req:UserRequest, res:Response, next:NextFunction) => {
        const user = req.user;
        const userRole:string = user?.role;
        if (!roles.includes(userRole)) {
            const unauthorized = new UnauthorizedError("O usuário não tem permissão para essa ação")
            handleError(res, unauthorized);
        }
        next();
    }
} 