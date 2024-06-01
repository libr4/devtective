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
import { login } from '../controllers/authController.js';

authRouter.route('/register')
    .post(validateRegisterInput,createUser);

authRouter.route('/login')
    .post(validateLoginInput, login)
    // .get(validateIdParam, getTask)
    // .patch(validateIdParam, updateTask)
    // .delete(validateIdParam, deleteTask);

export default authRouter