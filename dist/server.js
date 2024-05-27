// import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config(); //pode dar problema se colocar embaixo
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import taskRouter from './routes/taskRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import projectRouter from './routes/projectRouter.js';
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
app.get('/api/hello', (req, res) => {
    return res.status(200).json('Hello, world!');
});
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('*', (req, res) => {
    return res.status(404).json({ msg: "Not found!" });
});
app.use(errorHandlerMiddleware);
// try {
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server started running...");
    });
})
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
export default app;
// }
// catch(error) {
//     console.log(error);
//     process.exit(1);
// }
