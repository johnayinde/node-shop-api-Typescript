import CategoryModel from './category.model';
import ICategory from './category.interface';
import { Types } from 'mongoose';

export default class CategoryService {
    /**
     * Create a new Product
     */

    static async create(name: string) {
        try {
            const category = await new CategoryModel({
                name,
            }).save();

            return category;
        } catch (error) {
            return new Error('Unable to create a category');
        }
    }

    static async update(id: string, category: ICategory) {
        try {
            const exist = await CategoryModel.exists({ _id: id });

            if (!exist) return new Error('Category does not exist');

            const updatedCategory = await CategoryModel.findByIdAndUpdate(
                id,
                {
                    $set: category,
                },
                { new: true }
            );

            return updatedCategory;
        } catch (error) {
            return new Error('Unable to update category');
        }
    }

    static async delete(id: string) {
        try {
            return await CategoryModel.findByIdAndDelete(id);
        } catch (error) {
            return new Error('Unable to delete category');
        }
    }

    static async deleteMultiple(categoryIds: string[]) {
        try {
            const formatIds: Types.ObjectId[] = [];

            categoryIds.forEach((id: string) => {
                formatIds.push(new Types.ObjectId(id));
            });
            console.log('formatedIds', formatIds);

            return await CategoryModel.deleteMany({
                _id: { $in: formatIds },
            });
        } catch (error) {
            return new Error('Unable to delete categories');
        }
    }

    static async getOne(id: string) {
        try {
            const exist = await CategoryModel.exists({ _id: id });

            if (!exist) return new Error('Category does not exist');

            return await CategoryModel.findById(id);
        } catch (error) {
            return new Error('Unable to get category');
        }
    }

    static async getMany(query: string): Promise<ICategory[] | Error> {
        try {
            let category;
            if (query) {
                console.log('sort');

                category = await CategoryModel.find()
                    .sort({ createdAt: -1 })
                    .limit(5);
                return category;
            }

            category = await CategoryModel.find();
            console.log('no sort');

            return category;
        } catch (error) {
            return new Error('Unable to get category');
        }
    }
}
