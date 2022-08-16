import { Types } from 'mongoose';

export default interface IOrder {
    userId: string;
    totalPrice: number;
    payed: boolean;
    carts: [Types.ObjectId];
}
