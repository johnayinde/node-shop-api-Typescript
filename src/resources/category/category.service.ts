import CategoryModel from './category.model';
import ICategory from './category.interface';
import { Types } from 'mongoose';

export default class CategoryService {
    /**
     * Create a new Category
     */

    static async create(name: string) {
        try {
            const category = await new CategoryModel({
                name,
            }).save();

            return category;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update a Category by ID
     */
    static async update(id: string, category: ICategory) {
        try {
            const exist = await CategoryModel.exists({ _id: id });

            if (!exist) throw new Error('Category does not exist');

            const updatedCategory = await CategoryModel.findByIdAndUpdate(
                id,
                {
                    $set: category,
                },
                { new: true }
            );
            console.log(updatedCategory);

            return updatedCategory;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete a Category
     */
    static async delete(id: string) {
        try {
            const exist = await CategoryModel.exists({ _id: id });
            if (!exist) throw new Error('Category does not exist');

            return await CategoryModel.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete multiple Categories
     * - it takes list of categories Ids of type string
     * - converts to a valid object Ids
     * - performs a multiple delete on the Objects Ids
     */
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
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get a Category by ID
     */
    static async getOne(id: string) {
        try {
            const exist = await CategoryModel.exists({ _id: id });

            if (!exist) throw new Error('Category does not exist');

            return await CategoryModel.findById(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get all Categories and by Query in sorting date created
     */
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
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
