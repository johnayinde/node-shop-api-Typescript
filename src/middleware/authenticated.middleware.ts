import userModel from '@/resources/users/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import Token from '@/utils/interfaces/token.interface';
import { decodeToken } from '@/utils/token';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/resources/users/user.interface';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;

    if (!bearer) return res.status(401).json({ error: 'Unauthorised' });

    const accessToken = bearer.split(' ')[1];

    try {
        const payload: Token | jwt.JwtPayload = decodeToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError)
            return next(new HttpException(401, 'Unauthorised'));

        // console.log('payload', payload);
        const user = await userModel
            .findById(payload.id)
            .select('-password')
            .exec();

        req.user = user as User;

        return next();
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
}

const verifyTokenAndAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            return next();
        }
        return res
            .status(402)
            .json({ error: 'You are not allowed to do that!' });
    });
};

export { verifyToken, verifyTokenAndAdmin };
