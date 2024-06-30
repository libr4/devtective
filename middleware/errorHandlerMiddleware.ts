import { ErrorRequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, ValidationError } from "../errors/customErrors.js";

interface ErrorResponse {
    messages:string[];
}

const errorHandlerMiddleware:ErrorRequestHandler = (err, req, res, next) => {
    return handleError(res, err);
    // console.log(err);
    // const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    // const message = err.message || "Ocorreu um erro. Tente mais tarde!"
    // return res.status(statusCode).json(message);
}

export function handleError(res:Response, error:any) {
    // if (process.env.NODE_ENV === "development") {
        console.log(error);
    // }
    const genericMessage = "Ocorreu um erro. Tente mais tarde!";
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let messages : string[];
    if (error instanceof ValidationError || error instanceof NotFoundError) {
        messages = error.messages
    }
    else if (error instanceof Error) {
        messages = [error.message];
    }
    else {
        messages = [genericMessage];
    }

    let response : ErrorResponse = {messages}
    // const messages = { messages:(error.messages || (error.message ? [error.message] : false) || [ genericMessage ])};
    return res.status(statusCode).json(response);
}

export default errorHandlerMiddleware;