import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
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

            res.status(201).json({ product });
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

            res.status(201).json({ updatedProduct });
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

            await ProductService.delete(id);

            res.status(201).json('Item Deleted');
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

            return res.status(201).json({ products });
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

            return res.status(201).json({ product });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ProductController;
