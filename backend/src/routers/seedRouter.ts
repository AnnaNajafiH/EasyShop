import express from 'express';
import { sampleProducts , sampleUsers} from '../data/data';
import { ProductModel } from '../models/productModel';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';


export const seedRouter= express.Router();

seedRouter.get('/', 
    asyncHandler (async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts)

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.json({createdProducts, createdUsers});   
    })
);








//you can use this as well to seed the data without deleting the existing data:
// seedRouter.get('/', async (req: Request, res: Response) => {
//     try {
//         const createdBooks = await Promise.all(sampleBooks.map(book => 
//             ProductModel.findOneAndUpdate(
//                 { title: book.title },
//                 book,
//                 { upsert: true, new: true }
//             )
//         ));

//         const createdUsers = await Promise.all(sampleUsers.map(user => 
//             UserModel.findOneAndUpdate(
//                 { email: user.email },
//                 user,
//                 { upsert: true, new: true }
//             )
//         ));

//         res.json({ createdBooks, createdUsers });
//     } catch (error) {
//         res.status(500).json({ message: "Error seeding database", error });
//     }
// });