import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import { validateOrder } from './order.validation';
import {
    verifyToken,
    verifyTokenAndAdmin,
} from '@/middleware/authenticated.middleware';
import OrderController from './order.controller';

const orderRoute = Router();

orderRoute.route('/:id').delete(verifyToken, OrderController.deleteOrder);

orderRoute
    .route('/:userId')
    .post(verifyToken, validation(validateOrder), OrderController.createOrder)
    .get(verifyTokenAndAdmin, OrderController.getUserOrder);

orderRoute
    .route('/:userId/pay')
    .put(verifyTokenAndAdmin, OrderController.payOrders);

export default orderRoute;
