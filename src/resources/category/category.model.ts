import { Schema, model } from 'mongoose';
import ICategory from './category.interface';

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        // products: {
        //     type: [Schema.Types.ObjectId],
        //     ref: 'product',
        // },
    },
    { timestamps: true }
);

export default model<ICategory>('category', CategorySchema);
