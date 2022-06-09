import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import HttpException from '../../utils/exceptions/http.exception';
import ICart from './cart.interface';
import CartService from './cart.service';

class CartController {
    static createCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const cart = await CartService.create(req.body as ICart);

            res.status(201).json({ cart });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static updateCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const updatedCart = await CartService.update(id, req.body);

            res.status(201).json({ updatedCart });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static deleteCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            await CartService.delete(id);

            res.status(201).json('Item Deleted');
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getAllCarts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const newQuery = req.query.sort as string;
        console.log(newQuery);
        try {
            const carts = await CartService.getCarts(newQuery);

            return res.status(201).json({ carts });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getUserCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const cart = await CartService.getUserCart(req.params.userId);

            return res.status(201).json({ cart });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CartController;
