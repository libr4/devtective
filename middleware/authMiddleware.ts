import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { handleError } from "./errorHandlerMiddleware.js";
import { verifyJWT } from "../utils/authUtils.js";
// import { IUser } from "../models/UserModel.js";
import { IUser } from "../types/user.js";
import { UserRequest } from "../types/user.js";


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