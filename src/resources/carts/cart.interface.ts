import { Document } from 'mongoose';
import IProduct from '../products/product.interface';

interface products {
    productId: IProduct;
    quantity: number;
}

export default interface ICart {
    total: number;
    userId: string;
    products: [products];
}
