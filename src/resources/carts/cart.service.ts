import cartModel from './cart.model';
import ICart from './cart.interface';
import { Types } from 'mongoose';

export default class CartService {
    /**
     * Create a new Product
     */

    static async create(payload: ICart) {
        try {
            const cart = await new cartModel(payload).save();

            return cart;
        } catch (error) {
            return new Error('Unable to create a product');
        }
    }

    static async update(id: string, cart: ICart) {
        try {
            const exist = await cartModel.exists({ _id: id });

            if (!exist) return new Error('Cart does not exist');

            const updatedCart = await cartModel.findByIdAndUpdate(
                id,
                {
                    $set: cart,
                },
                { new: true }
            );

            return updatedCart;
        } catch (error) {
            return new Error('Unable to update cart');
        }
    }

    static async delete(id: string) {
        try {
            const exist = await cartModel.findById(id);
            console.log(exist === null);

            if (exist === null) {
                new Error('Cart does not exist');
            }

            return await cartModel.findByIdAndDelete(id);
        } catch (error) {
            return new Error('Unable to delete cart');
        }
    }

    static async deleteMultiple(cartIds: string[]) {
        try {
            const formatIds: Types.ObjectId[] = [];

            cartIds.forEach((id: string) => {
                formatIds.push(new Types.ObjectId(id));
            });

            return await cartModel.deleteMany({
                _id: { $in: formatIds },
            });
        } catch (error) {
            return new Error('Unable to delete carts');
        }
    }

    static async getUserCart(userId: string) {
        try {
            const exist = await cartModel.exists({ userId });

            if (!exist) return new Error('user cart does not exist');

            return await cartModel.findOne({ userId });
        } catch (error) {
            return new Error('Unable to get user cart');
        }
    }

    static async getCarts(query: string): Promise<ICart[] | Error> {
        try {
            let carts;
            if (query) {
                console.log('sort');

                carts = await cartModel.find().sort({ createdAt: -1 }).limit(5);
                return carts;
            }

            carts = await cartModel.find();
            console.log('no sort');

            return carts;
        } catch (error) {
            return new Error('Unable to get cart');
        }
    }
}
