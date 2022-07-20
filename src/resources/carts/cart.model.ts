import { number } from 'joi';
import { Schema, model } from 'mongoose';
import ICart from './cart.interface';

const CartSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'product',
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
