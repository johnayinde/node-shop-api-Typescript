import Joi from 'joi';

const validateRegisterUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});
const validateLoginUser = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

export { validateLoginUser, validateRegisterUser };
