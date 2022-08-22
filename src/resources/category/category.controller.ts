import { Request, Response, NextFunction } from 'express';
import HttpException from '../../utils/exceptions/http.exception';
import ICategory from './category.interface';
import CategoryService from './category.service';

class CategoryController {
    static createCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name } = req.body as ICategory;

            const category = await CategoryService.create(name);

            res.status(201).json({ payload: category });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static updateCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const updatedCategory = await CategoryService.update(id, req.body);

            if (!updatedCategory)
                return res.status(404).json('Item does not exist');

            res.status(201).json({ payload: updatedCategory });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static deleteCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            await CategoryService.delete(id);
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static deleteMultipleCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { categoryIds } = req.body;

            await CategoryService.deleteMultiple(categoryIds);
            return res
                .status(200)
                .json({ message: 'Categories deleted successfully' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getAllCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const newQuery = req.query.new as string;
        console.log(newQuery);
        try {
            const categories = await CategoryService.getMany(newQuery);

            return res.status(200).json({ payload: categories });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const category = await CategoryService.getOne(req.params.id);

            return res.status(200).json({ payload: category });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CategoryController;
