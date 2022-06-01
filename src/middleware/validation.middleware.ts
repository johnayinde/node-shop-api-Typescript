import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { value, error } = schema.validate(req.body, validationOptions);

        if (error) {
            res.status(400).send({ errors: error });
        }

        console.log(req.body);
        req.body = value;
        next();
    };
}

export default validationMiddleware;
