import {Request, Response} from 'express'
import { Router } from 'express';

const router = Router();

import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    deleteManyTasks
} from '../controllers/taskController.js'
import { validateTaskIdParam, validateTaskData } from '../middleware/taskValidation.js';

// router.use('/projects/:projectId/tasks')

router.route('/')
    .get(getAllTasks)
    .post(validateTaskData,
        createTask)
    .delete(deleteManyTasks);

router.route('/:taskId')
    .get(validateTaskIdParam, 
        getTask)
    .patch(validateTaskIdParam, 
        updateTask)
    .delete(validateTaskIdParam, 
        deleteTask);

export default router