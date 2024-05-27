import { Router } from 'express';
const router = Router();
import { getAllTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateIdParam, validateTaskData } from '../middleware/taskValidationMiddleware.js';
router.route('/')
    .get(getAllTasks)
    .post(validateTaskData, createTask);
router.route('/:taskId')
    .get(validateIdParam, getTask)
    .patch(validateIdParam, updateTask)
    .delete(validateIdParam, deleteTask);
export default router;
