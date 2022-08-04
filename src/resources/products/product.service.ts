import productModel from './product.model';
import IProduct from './product.interface';
import { Types } from 'mongoose';

export default class ProductService {
    /**
     * Create a new Product
     */

    static async create(
        img: string,
        title: string,
        desc: string,
        size: string,
        price: number,
        categories: string[]
    ) {
        try {
            const product = await new productModel({
                img,
                title,
                desc,
                size,
                price,
                categories,
            }).populate('categories');

            await product.save();

            return product;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async update(id: string, product: IProduct) {
        try {
            const exist = await productModel.exists({ _id: id });

            if (!exist) throw new Error('Product does not exist');

            const updatedProduct = await productModel
                .findByIdAndUpdate(
                    id,
                    {
                        $set: product,
                    },
                    { new: true }
                )
                .populate('categories');

            return updatedProduct;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: string) {
        try {
            const exist = await productModel.findById(id);

            if (!exist) throw new Error('Product does not exist');

            return await productModel.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async deleteMultiple(productIds: string[]) {
        try {
            const formatIds: Types.ObjectId[] = [];

            productIds.forEach((id: string) => {
                formatIds.push(new Types.ObjectId(id));
            });
            console.log('formatedIds', formatIds);

            const docs = await productModel.deleteMany({
                _id: { $in: formatIds },
            });

            return docs;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getProduct(id: string) {
        try {
            const exist = await productModel.exists({ _id: id });

            if (!exist) throw new Error('Product does not exist');

            const product = await productModel.findById(id);

            return product;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getProducts(query: string): Promise<IProduct[] | Error> {
        try {
            let products;
            if (query) {
                console.log('sort');

                products = await productModel
                    .find()
                    .sort({ createdAt: -1 })
                    .limit(5);
                return products;
            }

            products = await productModel.find();
            console.log('no sort');

            return products;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
