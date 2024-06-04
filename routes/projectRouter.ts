import { Router } from 'express';

const projectRouter = Router();

import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { validateProjectIdParam } from '../middleware/projectValidation.js';

projectRouter.route('/')
    .get(getAllProjects)
    .post(createProject);

projectRouter.route('/:projectId')
    .patch(validateProjectIdParam, updateProject)
    .delete(validateProjectIdParam, deleteProject);

export default projectRouter