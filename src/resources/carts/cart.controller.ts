import { Request, Response, NextFunction } from 'express';
import HttpException from '../../utils/exceptions/http.exception';
import CartService from './cart.service';

class CartController {
    static createCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { userId, productId, quantity } = req.body;
        try {
            const cart = await CartService.create(userId, productId, quantity);
            // console.log({ cart });

            res.status(201).json({ payload: cart });
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

            res.status(200).json({ message: 'Cart Item Deleted successfully' });
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

            return res.status(200).json({ payload: carts });
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
            console.log('user cart');

            const cart = await CartService.getUserCart(req.params.userId);

            return res.status(200).json({ payload: cart });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CartController;
