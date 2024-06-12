import {Request, Response} from 'express'
import { Router } from 'express';

const testRouter = Router();

import { deleteUser, getCurrentUser, updateUser } from '../controllers/userController.js';
import { body, validationResult } from 'express-validator';
import { authenticateUser, validateJWT } from '../middleware/authMiddleware.js';
import { validateUserChanges, validateUserIdParam } from '../middleware/userValidation.js';
import ProjectModel from '../models/ProjectModel.js';

const getUserProject = async (req:Request, res:Response) => {
    const projectsWithMemberNames = await ProjectModel.aggregate([
        {
          $lookup: {
            from: 'users', // the name of the collection to join
            localField: 'members', // field in the Project collection
            foreignField: '_id', // field in the User collection
            as: 'memberDetails' // output array field
          }
        }])
}

testRouter.route('/')
    .get(getUserProject)


export default testRouter