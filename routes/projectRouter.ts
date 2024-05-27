import { Router } from 'express';

const projectRouter = Router();

import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js'
import { validateIdParam, validateTaskData } from '../middleware/taskValidationMiddleware.js';
import { createProject, getAllProjects } from '../controllers/projectController.js';

projectRouter.route('/')
    .get(getAllProjects)
    .post(createProject);
    // .post(validateTaskData, createTask);

projectRouter.route('/:taskId')
    .get(validateIdParam, getTask)
    .patch(validateIdParam, updateTask)
    .delete(validateIdParam, deleteTask);

export default projectRouter