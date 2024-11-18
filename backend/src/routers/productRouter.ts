// for removing error on express i added ("esModuleInterop": true) to tsconfig.json
import express from 'express';
import { ProductModel } from '../models/productModel';

export const productRouter = express.Router();


productRouter.get('/', async(req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
}
);

productRouter.get('/:slug', async(req, res) => {
    const products = await ProductModel.findOne({slug: req.params.slug});
    if (products) {
        res.json(products);
    } else {
        res.status(404).json({message: "Product not found"});
    }
}
);