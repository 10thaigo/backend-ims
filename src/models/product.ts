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
            const error = new Error(`No se pudo agregar el producto: ${err.message}`);
            error.name = "CantAddProduct";
            throw error;
        }
    }
    
    static async get(code: number) {
        try {
            const product = await db<ProductType>(TABLE_NAME)
                .where({ code })
                .first();

            if (!product) {
                throw new Error('Producto no encontrado');
            }

            return await productSchema.parseAsync(product);
        } catch (err: any) {
            const error = new Error(`Error al obtener el producto: ${err.message}`);
            error.name = 'GetProductError';
            throw error;
        }
    }

    static async update(product: ProductType) {
        try {
            const updatedCount = await db<ProductType>(TABLE_NAME)
                .where({ code: product.code })
                .update(product);

            if (updatedCount === 0) {
                throw new Error('Producto no encontrado para actualizar');
            }

            return await this.get(product.code);
        } catch (err: any) {
            const error = new Error(`No se pudo actualizar el producto: ${err.message}`);
            error.name = 'UpdateProductError';
            throw error;
        }
    }

    static async del(code: number) {
        try {
            const deletedCount = await db<ProductType>(TABLE_NAME)
                .where({ code })
                .del();

            if (deletedCount === 0) {
                throw new Error('Producto no encontrado para eliminar');
            }

            return deletedCount;
        } catch (err: any) {
            const error = new Error(`No se pudo eliminar el producto: ${err.message}`);
            error.name = 'DeleteProductError';
            throw error;
        }
    }

    static async getAll() {
        try {
            const products = await db<ProductType>(TABLE_NAME).select();
            return await productSchema.array().parseAsync(products);
        } catch (err: any) {
            const error = new Error(`Error al obtener los productos: ${err.message}`);
            error.name = 'GetAllProductsError';
            throw error;
        }
    }
}