import { Document } from 'mongoose';

interface products {
    productId: string;
    quantity: number;
}

export default interface ICart extends Document {
    userId: string;
    products: products[];
}
