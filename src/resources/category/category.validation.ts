import Joi from 'joi';

const validateCategory = Joi.object({
    name: Joi.string().required(),
});

const validateUpdateCategory = Joi.object({
    name: Joi.string(),
});

const validateDeleteCategories = Joi.object({
    categoryIds: Joi.array().items(Joi.string()).required(),
});

export { validateCategory, validateDeleteCategories, validateUpdateCategory };
