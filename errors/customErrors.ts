import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
    statusCode: StatusCodes;
    messages:string[];
    
    constructor(messages:string[]) {
        super(messages.join(", "));
        this.name = 'NotFoundError';
        this.statusCode = StatusCodes.NOT_FOUND;
        this.messages = messages;
    }
}

export class ValidationError extends Error {
    statusCode: number;
    messages: string[];
    constructor(messages: string[]) {
        super(messages.join(', '))
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.messages = messages;
        
    }
}

export class BadRequestError extends Error {
    statusCode: StatusCodes;
    messages: string[];
    constructor(messages:string[]) {
      super();
      this.name = 'BadRequestError';
      this.statusCode = StatusCodes.BAD_REQUEST;
      this.messages = messages
    }
  }
  export class UnauthenticatedError extends Error {
    statusCode: StatusCodes;
    constructor(message:string) {
      super(message);
      this.name = 'UnauthenticatedError';
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  export class UnauthorizedError extends Error {
    statusCode: StatusCodes;
    constructor(message:string) {
      super(message);
      this.name = 'UnauthorizedError';
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }