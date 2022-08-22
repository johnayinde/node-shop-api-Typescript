import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import { validateOrder } from './order.validation';
import {
    verifyToken,
    verifyTokenAndAdmin,
} from '@/middleware/authenticated.middleware';
import OrderController from './order.controller';

const orderRoute = Router();

orderRoute.route('/:orderId').delete(verifyToken, OrderController.deleteOrder);

orderRoute
    .route('/:userId')
    .post(verifyToken, OrderController.createOrder)
    .get(verifyToken, OrderController.getUserOrder);

orderRoute
    .route('/:orderId/:userId/pay')
    .put(verifyToken, OrderController.payOrders);

export default orderRoute;
