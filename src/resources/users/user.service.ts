import userModel from './user.model';
import { encodeToken } from '../../utils/token';
import User from './user.interface';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

export default class UserService {
    /**
     * Create a new User
     */

    static async registerUser(name: string, email: string, password: string) {
        try {
            const createUser = await new userModel({
                name,
                email,
                password,
            }).save();

            const user = await userModel
                .findOne({ _id: createUser._id })
                .select({ password: 0 });

            // const accessToken = encodeToken(user);
            return user;
        } catch (error) {
            return new Error('Unable to create a user');
        }
    }

    /**
     * login a User
     */

    static async loginUser(email: string, password: string) {
        try {
            const user = await userModel.findOne(
                { email },
                { createdAt: 0, updatedAt: 0 }
            );

            if (!user)
                throw new Error('Unable to fine user with tha Email Address');

            if (await user.isValidPassword(password)) {
                const token = encodeToken(user);
                return { token, user };
            }
            throw new Error('Invalid credentials');
        } catch (error) {
            throw new Error('Unable to login user');
        }
    }

    static async getAllUsers(query: string): Promise<Error | User[]> {
        try {
            let users: User[];
            console.log(query);

            if (query) {
                users = await userModel.find().sort({ _id: -1 }).limit(2);
            }
            users = await userModel.find();

            if (!users) throw new Error('Unable to find users');
            return users;
        } catch (error) {
            throw new Error('Unable to login user');
        }
    }
}
