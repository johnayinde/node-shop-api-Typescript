import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import { validateCart } from './cart.validation';
import {
    verifyToken,
    verifyTokenAndAdmin,
} from '@/middleware/authenticated.middleware';
import CartController from './cart.controller';

const cartRoute = Router();

cartRoute
    .route('/')
    .post(verifyToken, validation(validateCart), CartController.createCart)
    .get(verifyToken, CartController.getAllCarts);

cartRoute
    .route('/:id')
    .put(verifyToken, validation(validateCart), CartController.updateCart)
    .delete(verifyToken, CartController.deleteCart);

cartRoute
    .route('/:userId')
    .get(verifyTokenAndAdmin, CartController.getUserCart);

export default cartRoute;
