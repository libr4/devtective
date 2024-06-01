import {Request, Response} from 'express'
import { Router } from 'express';

const router = Router();

import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js'
import { validateIdParam, validateRegisterData, validateTaskData } from '../middleware/taskValidation.js';
import { createUser } from '../controllers/userController.js';
import { body, validationResult } from 'express-validator';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

const testValidator = (req:Request, res:Response) => {
    const result = validationResult(req);
    const test = "test";
    return res.json({test, result});

}

router.route('/')
    .get(getAllTasks)
    .post(validateRegisterInput, testValidator);
    // .post(body('email').notEmpty().withMessage('hsufhuasfhu').isEmail().withMessage('Email invalido'),createUser);

router.route('/:taskId')
    .get(validateIdParam, getTask)
    .patch(validateIdParam, updateTask)
    .delete(validateIdParam, deleteTask);

export default router