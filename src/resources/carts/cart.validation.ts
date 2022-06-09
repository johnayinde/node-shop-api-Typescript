import Joi from 'joi';

const validateCart = Joi.object({
    userId: Joi.string().required().label('UserId'),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string(),
            quantity: Joi.number(),
        })
    ),
});

export { validateCart };
