import {Request, Response} from 'express'
import { Router } from 'express';

const router = Router();

import { deleteUser, getCurrentUser, updateUser } from '../controllers/userController.js';
import { body, validationResult } from 'express-validator';
import { authenticateUser, validateJWT } from '../middleware/authMiddleware.js';
import { validateUserChanges, validateUserIdParam } from '../middleware/userValidation.js';

const testValidator = (req:Request, res:Response) => {
    const result = validationResult(req);
    const test = "test";
    return res.json({test, result});

}

router.route('/current-user')
    .get(validateJWT, authenticateUser, getCurrentUser)
    // .post(validateRegisterInput, testValidator);
    // .post(body('email').notEmpty().withMessage('hsufhuasfhu').isEmail().withMessage('Email invalido'),createUser);

router.route('/:userId')
    .patch(validateUserIdParam, validateJWT, validateUserChanges, authenticateUser, updateUser)
    .delete(validateUserIdParam, validateJWT, authenticateUser, deleteUser);

export default router