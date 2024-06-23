// import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config(); //pode dar problema se colocar embaixo

import express, { ErrorRequestHandler, Request, Response } from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import taskRouter from './routes/taskRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import projectRouter from './routes/projectRouter.js';
import cookieParser from 'cookie-parser';
import { authenticateUser, validateJWT } from './middleware/authMiddleware.js';
import { validateProjectIdParam } from './middleware/projectValidation.js';
import testRouter from './routes/testRouter.js';
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
app.get('/api/hello', (req:Request, res:Response) => {
    console.log(req.body)
    console.log("query", req.query)
    return res.json({text:'Hello!'})
})
app.use('/api/v1/projects', validateJWT, authenticateUser, projectRouter)
app.use('/api/v1/projects/:projectId/tasks', validateProjectIdParam, validateJWT, authenticateUser, taskRouter)
app.use('/api/v1/users',  userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/test', testRouter)

app.use('*', (req, res) => {
    return res.status(404).json({msg:"Not found!"})
})

app.use(errorHandlerMiddleware)

// try {
mongoose.connect(process.env.MONGO_URL as string).then(() => {
    if (process.env.NODE_ENV !== "test") {
        app.listen(process.env.PORT || 5000, () => {
            // console.log("Server started running...")
        })
    }
})
.catch((error:unknown) => {
    console.log(error);
    process.exit(1);
})

export default app;
// }
// catch(error) {
//     console.log(error);
//     process.exit(1);
// }