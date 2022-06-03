import { Router } from 'express';
import validation from '@/middleware/validation.middleware';
import { validateProduct, validateUpdateProduct } from './product.validation';
import {
    verifyToken,
    verifyTokenAndAdmin,
} from '@/middleware/authenticated.middleware';
import ProductController from './product.controller';

const productRoute = Router();

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
        validation(validateUpdateProduct),
        verifyTokenAndAdmin,
        ProductController.updateProduct
    )
    .delete(verifyTokenAndAdmin, ProductController.deleteProduct)
    .get(ProductController.getProduct);

export default productRoute;
