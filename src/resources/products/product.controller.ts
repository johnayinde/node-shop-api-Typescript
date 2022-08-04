import { Request, Response, NextFunction } from 'express';
import HttpException from '../../utils/exceptions/http.exception';
import IProduct from './product.interface';
import ProductService from './product.service';

class ProductController {
    static createProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, img, desc, price, size, categories } =
                req.body as IProduct;

            const product = await ProductService.create(
                img,
                title,
                desc,
                size,
                price,
                categories
            );

            res.status(201).json({ payload: product });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static updateProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const updatedProduct = await ProductService.update(id, req.body);

            if (!updatedProduct)
                return res.status(404).json('Item does not exist');

            res.status(201).json({ payload: updatedProduct });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static deleteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const doc = await ProductService.delete(id);

            if (!doc) return res.status(404).json('Item does not exist');

            res.status(201).json({ payload: doc });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static deleteMultipleProducts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { productIds } = req.body;

            const doc = await ProductService.deleteMultiple(productIds);

            if (!doc) return res.status(404).json('Items not deleted');

            return res.status(201).json({ payload: doc });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getAllProducts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const newQuery = req.query.new as string;
        console.log(newQuery);
        try {
            const products = await ProductService.getProducts(newQuery);

            return res.status(201).json({ payload: products });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const product = await ProductService.getProduct(req.params.id);

            return res.status(201).json({ payload: product });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ProductController;
