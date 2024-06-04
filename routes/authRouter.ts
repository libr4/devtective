import {Request, Response} from 'express'
import { Router } from 'express';

const authRouter = Router();

import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js'
import { validateIdParam, validateTaskData } from '../middleware/taskValidation.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
import { createUser } from '../controllers/userController.js';
import { login, logout } from '../controllers/authController.js';

authRouter.route('/register')
    .post(validateRegisterInput,createUser);

authRouter.route('/login')
    .post(validateLoginInput, login)
authRouter.route('/logout')
    .get(logout);

export default authRouter