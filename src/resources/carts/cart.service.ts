import cartModel from './cart.model';
import ICart from './cart.interface';
import { Types } from 'mongoose';
import productService from '../products/product.service';
import userModel from '../users/user.model';

export default class CartService {
    /**
     * Create a new Product
     *
     *
     */

    static async create(userId: string, productId: string, quantity: number) {
        try {
            /**
             * Get the user product and check if the userId exist iin the database
             * populate its products
             */
            const product = await productService.getProduct(productId);
            const exist = await userModel.exists({ _id: userId });
            if (!exist) throw new Error('User does not exist');

            const userCart = await cartModel
                .findOne({
                    userId,
                })
                .populate('products.productId');

            /**
             *  if the user already have a cart
             *  loop through its products and check and return
             *  if the product already exist in the cart
             */
            if (userCart) {
                const userProduct = userCart.products.filter((item) => {
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

                /**
                 *  get the product and check if its not undefined
                 * then it update the product
                 */
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

                    /**
                     * user has a cart but product does not exist in the product list
                     * push the product to the list and modify price and quantity
                     */

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

                /**
                 * user is new and does not have a cart
                 * create and save cart
                 */

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

    static async delete(id: string) {
        try {
            const exist = await cartModel.findById(id);

            if (!exist) throw Error('Cart does not exist');

            return await cartModel.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getUserCart(userId: string) {
        try {
            const exist = await cartModel.exists({ userId });

            if (!exist) throw new Error('user cart does not exist');

            return await cartModel
                .findOne({ userId })
                .populate('products.productId');
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getCarts(query: string): Promise<ICart[] | Error> {
        try {
            let carts;
            if (query) {
                console.log('sort');

                carts = await cartModel
                    .find()
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .populate('products.productId');

                return carts;
            }

            carts = await cartModel.find().populate('products.productId');

            console.log('no sort');

            return carts;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
