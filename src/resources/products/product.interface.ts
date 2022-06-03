import { Document, ObjectId, Types } from 'mongoose';

export default interface IProduct extends Document {
    img: string;
    title: string;
    desc: string;
    size: string;
    price: number;
    categories: string[];
}
