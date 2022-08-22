import orderModel from './order.model';
// import orderModel from './order.model';
import IOrder from './order.interface';
import { Types } from 'mongoose';
import productService from '../products/product.service';
import userModel from '../users/user.model';
import cartService from '../carts/cart.service';

export default class OrderService {
    /**
     * Create a new Order
     */

    static async create(userId: string) {
        try {
            /**
             * check if user exist and get all the carts belonging to the user
             * and get all items
             */
            const exist = await userModel.findById({ _id: userId });
            if (!exist) throw Error('User does not exist');

            const userCarts = await cartService.getUserCart(userId);
            const total_price = userCarts?.total;

            console.log({ userCarts });

            const userCartItems = userCarts?.products.map(
                (item) => item.productId
            );

            console.log({ userCartItems });

            const userOrder = await orderModel.findOne({
                userId,
                payed: false,
            });

            // create order if the user does not have a pending order to make
            //
            console.log({ userOrder });

            if (!userOrder) {
                const createOrder = await new orderModel({
                    userId,
                    totalPrice: total_price,
                    carts: userCartItems,
                }).populate('carts');

                await createOrder.save();
                return createOrder;
            } else {
                throw Error('User has an unpaid orders');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(orderId: string) {
        try {
            const exist = await orderModel.findById(orderId);

            if (!exist) throw Error('Order does not exist');

            return await orderModel.findByIdAndDelete(orderId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getUserOrder(userId: string) {
        try {
            const exist = await orderModel.exists({ userId });

            if (!exist) throw new Error('user does not have an order');

            return await orderModel.findOne({ userId }).populate('carts');
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async payUserOrder(orderId: string, userId: string) {
        try {
            const exist = await orderModel.findById(orderId);
            if (!exist) throw new Error('Order does not exist');

            if (exist.payed) {
                throw new Error('Order has already been paid');
            }

            return await orderModel.findOneAndUpdate(
                { userId },
                { $set: { payed: !exist.payed } },
                { new: true }
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
