import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { handleError } from "./errorHandlerMiddleware.js";
import { verifyJWT } from "../utils/authUtils.js";
import { IUser } from "../models/UserModel.js";

export interface UserRequest extends Request {
    user?: IUser
}

export const authenticateUser = (req:UserRequest, res:Response, next:NextFunction) => {
    const {token} = req.cookies;
    const unAuthError = new UnauthenticatedError("Autenticação inválida");
    if (!token) {
        handleError(res, unAuthError);
    }
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