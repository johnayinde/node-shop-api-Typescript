import cartModel from './cart.model';
import ICart from './cart.interface';
import { Types } from 'mongoose';
import productService from '../products/product.service';
import productModel from '../products/product.model';
import IProduct from '../products/product.interface';
import userService from '../users/user.service';
import userModel from '../users/user.model';

export default class CartService {
    /**
     * Create a new Product
     */

    static async create(userId: string, productId: string, quantity: number) {
        try {
            const product = await productService.getProduct(productId);
            const exist = await userModel.exists({ _id: userId });
            console.log(exist);

            if (!exist) throw new Error('User does not exist');

            const userCart = await cartModel
                .findOne({
                    userId,
                })
                .populate('products.productId');

            // console.log({ product, userCart });

            if (userCart) {
                const userProduct = userCart.products.filter((item) => {
                    // console.log('conditional', item.productId._id == productId);
                    console.log(
                        'LOOP-product exist?',
                        item.productId._id == productId
                    );
                    if (item.productId._id == productId) {
                        console.log('returned item', item);
                        return item;
                    }
                });

                console.log({ userProduct });
                console.log(userProduct[0]);
                const getProductInCart = userProduct[0];
                console.log('get length', getProductInCart != undefined);

                if (getProductInCart != undefined) {
                    console.log('quantity', getProductInCart!.quantity);

                    const updateUserCart = await cartModel
                        .findOneAndUpdate(
                            { 'products.productId': productId },
                            {
                                $set: {
                                    'products.$.quantity':
                                        getProductInCart!.quantity + quantity,
                                    total:
                                        userCart.total +
                                        product!.price * quantity,
                                },
                            },
                            { new: true }
                        )

                        .populate('products.productId');
                    console.log({ updateUserCart });

                    return updateUserCart;
                } else {
                    console.log('push create');

                    const pushUserCart = await cartModel
                        .findOneAndUpdate(
                            { userId },
                            {
                                $push: {
                                    products: {
                                        productId: productId,
                                        quantity,
                                    },
                                },
                                $set: {
                                    total:
                                        userCart.total +
                                        product!.price * quantity,
                                },
                            },
                            { new: true }
                        )
                        .populate('products.productId');

                    return pushUserCart;
                }
            } else {
                console.log('fresh create');

                const newCart = await new cartModel({
                    userId,
                    total: product!.price * quantity,
                    products: [{ productId, quantity }],
                }).populate('products.productId');

                await newCart.save();

                console.log({ newCart });

                return newCart;
            }
        } catch (error: any) {
            throw new Error(error.message);
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
