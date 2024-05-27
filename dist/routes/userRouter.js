import { Router } from 'express';
const router = Router();
import { getAllTasks, getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateIdParam } from '../middleware/taskValidationMiddleware.js';
import { validationResult } from 'express-validator';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';
const testValidator = (req, res) => {
    const result = validationResult(req);
    const test = "test";
    return res.json({ test, result });
};
router.route('/')
    .get(getAllTasks)
    .post(validateRegisterInput, testValidator);
// .post(body('email').notEmpty().withMessage('hsufhuasfhu').isEmail().withMessage('Email invalido'),createUser);
router.route('/:taskId')
    .get(validateIdParam, getTask)
    .patch(validateIdParam, updateTask)
    .delete(validateIdParam, deleteTask);
export default router;
