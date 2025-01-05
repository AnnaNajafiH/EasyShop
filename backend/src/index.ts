import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {productRouter} from "./routers/productRouter";
import { seedRouter } from './routers/seedRouter';
import { userRouter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';
import { keyRouter } from './routers/keyRouter';
import path from 'path';
import { Request, Response } from 'express';


dotenv.config();
const MONGODB_URI = 
process.env.MONGODB_URI || "mongodb://localhost/tsEasyShopping";
mongoose.set ('strictQuery', true);
mongoose
.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log('Error in connecting to MongoDB:', error.message);
});

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);
app.use('/api/key', keyRouter);

//for deploying (render), the frontend through the backend
app.use (express.static(path.join(__dirname, '../frontend/dist')));  
app.get('*', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT: number= parseInt((process.env.PORT||'4000') as string, 10);

// const Port = 4000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});




