import { Schema, model } from 'mongoose';
import IProduct from './product.interface';

const ProductSchema = new Schema(
    {
        img: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        size: {
            type: String,
        },
        price: {
            type: Number,
        },
        categories: {
            type: [Schema.Types.ObjectId],
            ref: 'category',
        },
    },
    { timestamps: true }
);

export default model<IProduct>('product', ProductSchema);
