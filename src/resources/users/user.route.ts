import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import { validateLoginUser, validateRegisterUser } from './user.validation';
import UserController from './user.controller';
import {
    verifyToken,
    verifyTokenAndAdmin,
} from '@/middleware/authenticated.middleware';

const userRoute = Router();

userRoute
    .route('/register')
    .post(validation(validateRegisterUser), UserController.register);

userRoute
    .route('/login')
    .post(validation(validateLoginUser), UserController.login);

userRoute.route('/all').get(verifyTokenAndAdmin, UserController.getAllUsers);
userRoute.route('/').get(verifyTokenAndAdmin, UserController.getUser);

export default userRoute;
