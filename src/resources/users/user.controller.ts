import { Request, Response, NextFunction } from 'express';
import UserService from '@/resources/users/user.service';
import HttpException from '../../utils/exceptions/http.exception';
import User from '@/resources/users/user.interface';

class UserController {
    static register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body as User;

            const user = await UserService.registerUser(name, email, password);

            res.status(201).json({ user });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await UserService.loginUser(email, password);

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) return next(new HttpException(404, 'No usser found'));

        return res.status(200).json({ user: req.user });
    };

    static getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const query: any = req.query.new;
        try {
            const users = await UserService.getAllUsers(query);

            return res.status(201).json({ users });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;
