import Joi from 'joi';

const validateOrder = Joi.object({
    userId: Joi.string().required().label('UserId'),
});

export { validateOrder };
