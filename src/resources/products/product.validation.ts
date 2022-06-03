import Joi from 'joi';

const validateProduct = Joi.object({
    img: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.string(),
    categories: Joi.array(),
});

const validateUpdateProduct = Joi.object({
    img: Joi.string(),
    title: Joi.string(),
    desc: Joi.string(),
    price: Joi.number(),
    size: Joi.string(),
    categories: Joi.array(),
});
const validateDeleteProducts = Joi.object({
    productIds: Joi.array().items(Joi.string()).required()
});

export { validateProduct, validateUpdateProduct, validateDeleteProducts };
