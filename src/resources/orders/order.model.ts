import { Schema, model } from 'mongoose';
import IOrder from './order.interface';

const OrderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
        },

        payed: {
            type: Boolean,
            default: false,
        },
        carts: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    },
    { timestamps: true }
);

export default model<IOrder>('Order', OrderSchema);
