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

            // console.log({ product, userCart });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: string) {
        try {
            const exist = await orderModel.findById(id);

            if (!exist) throw Error('Order does not exist');

            return await orderModel.findByIdAndDelete(id);
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

    static async payUserOrder(userId: string) {
        try {
            const exist = await orderModel.findOne({ userId });
            if (!exist) throw new Error('user does not have an order');

            if (exist.payed) {
                throw new Error('User Orders has already been paid');
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
