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
            type: Array,
        },
    },
    { timestamps: true }
);

export default model<IProduct>('Product', ProductSchema);
