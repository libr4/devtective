import { Router } from 'express';

const projectRouter = Router();

import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js'
import { validateIdParam, validateTaskData } from '../middleware/taskValidation.js';
import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { validateProjectIdParam } from '../middleware/projectValidation.js';

projectRouter.route('/')
    .get(getAllProjects)
    .post(createProject);
    // .post(validateTaskData, createTask);

projectRouter.route('/:projectId')
    // .get(validateIdParam, getTask)
    .patch(validateProjectIdParam, updateProject)
    .delete(validateProjectIdParam, deleteProject);

export default projectRouter