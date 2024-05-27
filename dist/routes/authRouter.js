import { Router } from 'express';
const authRouter = Router();
import { getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateIdParam } from '../middleware/taskValidationMiddleware.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';
import { createUser } from '../controllers/userController.js';
authRouter.route('/register')
    .post(validateRegisterInput, createUser);
authRouter.route('/:taskId')
    .get(validateIdParam, getTask)
    .patch(validateIdParam, updateTask)
    .delete(validateIdParam, deleteTask);
export default authRouter;
