import { Schema, model } from 'mongoose';
import ICart from './cart.interface';

const CartSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

export default model<ICart>('Cart', CartSchema);
