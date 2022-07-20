import Joi from 'joi';

const validateCart = Joi.object({
    userId: Joi.string().required().label('UserId'),
    productId: Joi.string().required().label('productId'),
    quantity: Joi.number().required().label('quantity'),
});

export { validateCart };
