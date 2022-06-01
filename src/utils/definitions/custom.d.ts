import User from '@/resources/users/user.interface';

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
