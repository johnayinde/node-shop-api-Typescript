import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import {
    validateCategory,
    validateDeleteCategories,
    validateUpdateCategory,
} from './category.validation';
import {
    verifyToken,
    verifyTokenAndAdmin,
} from '@/middleware/authenticated.middleware';
import CategoryController from './category.controller';

const categorytRoute = Router();

categorytRoute
    .route('/many')
    .delete(
        verifyTokenAndAdmin,
        validation(validateDeleteCategories),
        CategoryController.deleteMultipleCategories
    );

categorytRoute
    .route('/')
    .post(
        verifyTokenAndAdmin,
        validation(validateCategory),
        CategoryController.createCategory
    )
    .get(CategoryController.getAllCategories);

categorytRoute
    .route('/:id')
    .put(
        verifyTokenAndAdmin,
        validation(validateUpdateCategory),
        CategoryController.updateCategory
    )
    .delete(verifyTokenAndAdmin, CategoryController.deleteCategory)
    .get(CategoryController.getCategory);

export default categorytRoute;
