import { Request, Response, NextFunction } from 'express';
import HttpException from '../../utils/exceptions/http.exception';
import OrderService from './order.service';

export default class OrderController {
    static createOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { userId } = req.params;
        try {
            const order = await OrderService.create(userId);
            console.log({ order });

            res.status(201).json({ order });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static deleteOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            await OrderService.delete(id);

            res.status(201).json('Item Deleted');
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getUserOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const order = await OrderService.getUserOrder(req.params.userId);
            console.log(req.params);

            return res.status(201).json({ order });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static payOrders = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const order = await OrderService.payUserOrder(req.params.userId);
            console.log(req.params);

            return res.status(201).json({ order });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}
