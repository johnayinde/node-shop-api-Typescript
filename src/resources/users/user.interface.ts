import { Document, ObjectId, Types } from 'mongoose';

export default interface User extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;

    isValidPassword(password: string): Promise<Error | boolean>;
}
