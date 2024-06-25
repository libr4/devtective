import { Router } from 'express';

const projectRouter = Router();

import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { validateProjectIdParam, validateProjectInput } from '../middleware/projectValidation.js';

projectRouter.route('/')
    .get(getAllProjects)
    .post(validateProjectInput, createProject);

projectRouter.route('/:projectId')
    .patch(validateProjectIdParam, updateProject)
    .delete(validateProjectIdParam, deleteProject);

export default projectRouter