import {Request, Response} from 'express'
import { Router } from 'express';

const router = Router();

import { deleteUser, getAllUsers, getCurrentUser, updateUser } from '../controllers/userController.js';
import { body, validationResult } from 'express-validator';
import { authenticateUser, validateJWT } from '../middleware/authMiddleware.js';
import { validateUserChanges, validateUserIdParam } from '../middleware/userValidation.js';

router.route('/')
    .get(validateJWT, 
        authenticateUser, 
        getAllUsers)

router.route('/current-user')
    .get(validateJWT, 
        authenticateUser, 
        getCurrentUser)

router.route('/:userId')
    .patch(validateUserIdParam, 
        validateJWT, 
        validateUserChanges, 
        authenticateUser, 
        updateUser)
    .delete(validateUserIdParam, 
        validateJWT, 
        authenticateUser, 
        deleteUser);

export default router