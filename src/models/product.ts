import db from '../utils/db';
import { productSchema, ProductType } from '../schemas/product';

const TABLE_NAME = 'product';

export default class Product {
    static async add(product: ProductType) {
        try {
            await db<ProductType>(TABLE_NAME)
                .insert(product);
            return await this.get(product.code);
        } catch (err: any) {

        }
    }
    
    static async get(code: number) {
        try {
            const product = await db<ProductType>(TABLE_NAME)
                .where({ code })
                .first();

            if (!product) {
                return;
            }

            return await productSchema.parseAsync(product);
        } catch (err: any) {

        }
    }

    static async update(product: ProductType) {
        try {
            const updatedCount = await db<ProductType>(TABLE_NAME)
                .where({ code: product.code })
                .update(product);

            if (updatedCount === 0) {
                return;
            }

            return await this.get(product.code);
        } catch (err: any) {

        }
    }

    static async del(code: number) {
        try {
            const deletedCount = await db<ProductType>(TABLE_NAME)
                .where({ code })
                .del();

            if (deletedCount === 0) {
                return;
            }

            return deletedCount;
        } catch (err: any) {

        }
    }

    static async getAll() {
        try {
            const products = await db<ProductType>(TABLE_NAME).select();
            return await productSchema.array().parseAsync(products);
        } catch (err: any) {

        }
    }
}