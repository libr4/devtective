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
import { createTaskActivity, getAllTaskUpdates } from '../controllers/taskUpdateController.js';

// router.use('/projects/:projectId/tasks')

router.route('/')
    .get(getAllTaskUpdates)
    .post(createTaskActivity)
    .delete(deleteManyTasks);

// router.route('/:taskId')
//     .get(validateIdParam, 
//         getTask)
//     .patch(validateIdParam, 
//         updateTask)
//     .delete(validateIdParam, 
//         deleteTask);

export default router