import Models from '../models/models';
import { Request, Response } from 'express';
import { productSchema } from 'schemas/product';

export default class ProductController {
    static async add(req: Request, res: Response) {
        try {
            const parsed = await productSchema.parseAsync(req.body);
            const addedProduct = await Models.product.add(parsed);
            return res.status(201).json(addedProduct);
        } catch (error: any) {
            if (error.name) {
                return res.status(400).json({ error: error.message });
            }

            return res.status(500).json('Internal server error');
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const schema = productSchema.pick({ code: true });
            const { code } = await schema.parseAsync(req.params);
            const product = await Models.product.get(code);
            return res.status(200).json(product);
        } catch (error: any) {

            if (error.name) {
                return res.status(404).json({ error: error.message });
            }

            return res.status(500).json('Internal server error');
        }
    }

    static async getAll(_: Request, res: Response) {
        try {
            const products = await Models.product.getAll();
            return res.status(200).json(products);
        } catch (error: any) {
            if(error.name) {
                return res.status(404).json({ error: error.message });
            }

            return res.status(500).json('Internal server error');
        }
    }

    static async del(req: Request, res: Response) {
        try {
            const schema = productSchema.pick({ code: true });
            const { code } = await schema.parseAsync(req.params);
            await Models.product.del(code);
            return res.status(200).json({ message: 'Producto eliminado' });
        } catch (error: any) {
            if(error.name){
                return res.status(404).json({ error: error.message });
            }

            return res.status(500).json('Internal server error');
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const parsed = await productSchema.parseAsync(req.body);
            await Models.product.update(parsed);
            return res.status(200).json({ message: 'Producto actualizado' });
        } catch (error: any) {
            if (error.name) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json('Internal server error');
        }
    }
}