import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import {
    validateDeleteProducts,
    validateProduct,
    validateUpdateProduct,
} from './product.validation';
import { verifyTokenAndAdmin } from '@/middleware/authenticated.middleware';
import ProductController from './product.controller';

const productRoute = Router();

productRoute
    .route('/many')
    .delete(
        verifyTokenAndAdmin,
        validation(validateDeleteProducts),
        ProductController.deleteMultipleProducts
    );

productRoute
    .route('/')
    .post(
        verifyTokenAndAdmin,
        validation(validateProduct),
        ProductController.createProduct
    )
    .get(ProductController.getAllProducts);

productRoute
    .route('/:id')
    .put(
        verifyTokenAndAdmin,
        validation(validateUpdateProduct),
        ProductController.updateProduct
    )
    .delete(verifyTokenAndAdmin, ProductController.deleteProduct)
    .get(ProductController.getProduct);

export default productRoute;
